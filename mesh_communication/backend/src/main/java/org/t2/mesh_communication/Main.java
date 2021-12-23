package org.t2.mesh_communication;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory;
import java.io.IOException;
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
import org.t2.mesh_communication.log.Logger;

@Component
public class Main {
    private Orchestrator orchestrator;
    private MeshGrid meshGrid;
    private List<Product> products;

    public Main() {
        this.meshGrid = new MeshGrid();
        this.products = new ArrayList<>();
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

    public void prepareGrid() throws IOException {
        // read devices from layout file
        LayoutReader layoutReader = new LayoutReader();
        layoutReader.read();
        HashMap<Integer, Position> devices = layoutReader.getDevices();

        // add devices (and orchestrator)
        this.orchestrator =
                new Orchestrator(
                        devices.get(MeshGrid.ORCHESTRATOR_ID), new FloodStrategy(this.meshGrid));
        devices.remove(MeshGrid.ORCHESTRATOR_ID);
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

    public void orchestrate() {
        this.orchestrator.orchestrate(this.products);
    }

    public void advanceTick(int n) {
        for (int i = 0; i < n; ++i) {
            System.out.println("Tick " + Logger.getInstance().getTick());
            if (!meshGrid.update()) System.out.println("No updates...");
            Logger.getInstance().nextTick();
        }
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
