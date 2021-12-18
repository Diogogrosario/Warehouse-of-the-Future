package org.t2.mesh_communication;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Scanner;
import org.t2.mesh_communication.config.*;
import org.t2.mesh_communication.devices.*;
import org.t2.mesh_communication.devices.comm_strat.FloodStrategy;
import org.t2.mesh_communication.log.Logger;

public class Main {
    private final Orchestrator orchestrator;
    private final MeshGrid meshGrid;
    private List<Product> products;

    public Main() {
        this.meshGrid = new MeshGrid();
        this.orchestrator = new Orchestrator(new Position(-1, 0), new FloodStrategy(this.meshGrid));
        this.products = new ArrayList<>();
    }

    private void prepareGrid() throws IOException {
        // add orchestrator
        this.meshGrid.addDevice(this.orchestrator);

        // read devices from layout file
        LayoutReader layoutReader = new LayoutReader();
        layoutReader.read();
        HashMap<Integer, Position> devices = layoutReader.getDevices();

        // add devices
        this.meshGrid.addDevices(devices);

        // generate manifests
        final int nManifests = 3;
        ManifestGenerator manifestGenerator = new ManifestGenerator(nManifests, devices.keySet());
        manifestGenerator.generate();

        // read manifests
        ManifestReader manifestReader = new ManifestReader();
        manifestReader.read();
        this.products = manifestReader.getProducts();
    }

    public void run() {
        try {
            this.prepareGrid();
        } catch (IOException e) {
            System.err.println("Failed to prepare mesh grid.");
            System.exit(1);
        }

        this.orchestrator.orchestrate(this.products);

        Scanner sc = new Scanner(System.in);
        event_loop:
        while (true) {
            String nextLine = sc.nextLine();
            char cmd = nextLine.length() > 0 ? nextLine.charAt(0) : 'n';
            switch (cmd) {
                case 'n':
                case 'N':
                    for (int i = 0; i < (cmd == 'n' ? 1 : 10); ++i) {
                        System.out.println("Tick " + Logger.getInstance().getTick());
                        if (!meshGrid.update()) System.out.println("No updates...");
                        Logger.getInstance().nextTick();
                    }
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

    private static void prepareConfigs() {
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
        final int nDevices = 9, maxRows = 3, maxCols = 3;
        LayoutGenerator layoutGenerator = new LayoutGenerator(nDevices, maxRows, maxCols);
        try {
            layoutGenerator.generate();
        } catch (IOException e) {
            System.err.println("Layout generation failed.");
            System.exit(1);
        }
    }

    public static void main(String[] args) {
        prepareConfigs();
        new Main().run();
    }
}
