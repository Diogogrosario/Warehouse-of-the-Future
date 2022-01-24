package org.t2.mesh_communication;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory;
import java.io.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Scanner;
import org.springframework.stereotype.Component;
import org.t2.mesh_communication.config.*;
import org.t2.mesh_communication.devices.MeshGrid;
import org.t2.mesh_communication.devices.Orchestrator;
import org.t2.mesh_communication.devices.Position;
import org.t2.mesh_communication.devices.comm_strat.FloodStrategy;
import org.t2.mesh_communication.devices.components.BatteryObserver;
import org.t2.mesh_communication.log.Logger;
import org.t2.mesh_communication.mementos.Caretaker;
import org.t2.mesh_communication.mementos.Memento;

@Component
public class Main {
    private Orchestrator orchestrator;
    private MeshGrid meshGrid;
    private List<Product> products;
    private BatteryObserver batteryObserver;
    private Caretaker caretaker;

    public Main() {
        this.meshGrid = new MeshGrid(Config.getInstance().orchestratorId);
        this.products = new ArrayList<>();
        batteryObserver = BatteryObserver.getInstance();
        this.caretaker = new Caretaker();
    }

    public Orchestrator getOrchestrator() {
        return orchestrator;
    }

    public MeshGrid getMeshGrid() {
        return meshGrid;
    }

    public void setMeshGrid(MeshGrid meshGrid) {
        this.meshGrid = meshGrid;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void clearMeshGrid() {
        this.meshGrid = new MeshGrid(Config.getInstance().orchestratorId);
    }

    public void clearProducts() {
        this.products = new ArrayList<>();
    }

    public void readManifest(String manifestFile) {
        try {
            ManifestReader manifestReader = new ManifestReader(manifestFile);
            manifestReader.read();
            this.products = manifestReader.getProducts();
        } catch (Exception e) {
            System.out.println("Couldn't read manifest file!");
        }
    }

    public void prepareGrid(String layoutFile) throws IOException {
        // read devices from layout file
        LayoutReader layoutReader =
                (layoutFile != null) ? new LayoutReader(layoutFile) : new LayoutReader();
        layoutReader.read();
        HashMap<Integer, Position> devices = layoutReader.getDevices();

        // add devices (and orchestrator)
        int orchestratorId = this.meshGrid.getOrchestratorId();
        this.orchestrator =
                new Orchestrator(
                        orchestratorId,
                        devices.get(orchestratorId),
                        Config.getInstance().orchestratorRange,
                        new FloodStrategy(this.meshGrid, Config.getInstance().timeToLive));
        devices.remove(orchestratorId);
        this.meshGrid.addDevice(this.orchestrator);
        this.meshGrid.addDevices(devices);

        // generate manifests
        if (!ManifestGenerator.manifestFileExists()) {
            final int nManifests = 1;
            ManifestGenerator manifestGenerator =
                    new ManifestGenerator(nManifests, devices.keySet());
            manifestGenerator.generate();
        }

        // read manifests
        ManifestReader manifestReader = new ManifestReader();
        manifestReader.read();
        this.products = manifestReader.getProducts();
    }

    public void prepareGrid() throws IOException {
        this.prepareGrid(null);
    }

    public void orchestrate() {
        this.orchestrator.orchestrate(this.products.subList(0, 1));
    }

    public void advanceTick(int n) {
        for (int i = 0; i < n; ++i) {
            this.saveState(); // store state
            System.out.println("Tick " + Logger.getInstance().getTick());
            if (!meshGrid.update()) System.out.println("No updates...");

            // print total battery consumption for current tick
            System.out.println(batteryObserver);

            Logger.getInstance().nextTick();
            batteryObserver.reset(); // reset tick battery consumption count
        }
    }

    public int goBackTick(int n) {
        Logger logger = Logger.getInstance();
        int tick = logger.getTick() - n;
        if (tick < 0) {
            System.out.println("Can't undo that many ticks.");
            return -1;
        }
        this.loadState(n);
        logger.resetToTick(tick);
        System.out.println("Reset to tick " + tick);
        return 0;
    }

    public void loadState(int n) {
        Memento memento = this.caretaker.loadState(n);

        try {
            ByteArrayOutputStream bo = new ByteArrayOutputStream();
            ObjectOutputStream o = new ObjectOutputStream(bo);

            o.writeObject(memento.getOrchestrator());

            o.close();
            bo.close();

            ByteArrayInputStream bi = new ByteArrayInputStream(bo.toByteArray());
            ObjectInputStream i = new ObjectInputStream(bi);

            this.orchestrator = (Orchestrator) i.readObject();

            i.close();
            bi.close();

        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }

        try {
            ByteArrayOutputStream bo = new ByteArrayOutputStream();
            ObjectOutputStream o = new ObjectOutputStream(bo);

            o.writeObject(memento.getMeshGrid());

            o.close();
            bo.close();

            ByteArrayInputStream bi = new ByteArrayInputStream(bo.toByteArray());
            ObjectInputStream i = new ObjectInputStream(bi);

            this.meshGrid = (MeshGrid) i.readObject();

            i.close();
            bi.close();
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

    public void saveState() {
        Memento memento = new Memento(this.orchestrator, this.meshGrid);
        this.caretaker.saveState(memento);
    }

    public void run() {
        try {
            this.prepareGrid();
        } catch (IOException e) {
            System.err.println("Failed to prepare mesh grid.");
            System.exit(1);
        }

        Scanner sc = new Scanner(System.in);
        event_loop:
        while (true) {
            String nextLine = sc.nextLine();
            char cmd = nextLine.length() > 0 ? nextLine.charAt(0) : 'n';
            switch (cmd) {
                case 'n':
                case 'N':
                    this.advanceTick(cmd == 'n' ? 1 : 10);
                    break;
                case 'b':
                case 'B':
                    this.goBackTick(cmd == 'b' ? 1 : 10);
                    break;
                case 'o':
                    this.orchestrate();
                    break;
                case 'q':
                case 'Q':
                    System.err.println("Quitting...");
                    break event_loop;
                default:
                    System.err.println("Unknown command...");
                    continue event_loop;
            }
        }
    }

    public static void prepareConfigs() {
        // read configs
        ObjectMapper om = new ObjectMapper(new YAMLFactory());
        try {
            om.readValue(
                    Main.class.getClassLoader().getResourceAsStream("mesh.yaml"), Config.class);
        } catch (IOException e) {
            System.err.println("Couldn't get configs.");
            System.exit(1);
        }

        // generate layout
        if (!LayoutGenerator.layoutFileExists()) {
            final int nDevices = 9, maxRows = 3, maxCols = 3;
            LayoutGenerator layoutGenerator = new LayoutGenerator(nDevices, maxRows, maxCols);
            try {
                layoutGenerator.generate();
            } catch (IOException e) {
                System.err.println("Layout generation failed.");
                System.exit(1);
            }
        }
    }

    public static void main(String[] args) {
        prepareConfigs();
        new Main().run();
    }
}
