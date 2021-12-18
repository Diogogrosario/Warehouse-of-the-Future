package org.t2.mesh_communication;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory;
import java.io.IOException;
import java.util.HashMap;
import org.t2.mesh_communication.config.*;
import org.t2.mesh_communication.devices.*;
import org.t2.mesh_communication.devices.comm_strat.FloodStrategy;
import org.t2.mesh_communication.log.Logger;

public class Main {
    public static void main(String[] args) {
        int nDevices = 9, maxRows = 3, maxCols = 3, nManifests = 3;

        // generate layout
        LayoutGenerator layoutGenerator = new LayoutGenerator(nDevices, maxRows, maxCols);
        try {
            layoutGenerator.generate();
        } catch (IOException e) {
            e.printStackTrace();
        }

        ObjectMapper om = new ObjectMapper(new YAMLFactory());
        try {
            om.readValue(
                    Main.class.getClassLoader().getResourceAsStream("mesh.yaml"), Config.class);
        } catch (IOException e) {
            System.err.println("Couldn't get configs.");
            return;
        }

        // create grid
        MeshGrid meshGrid = new MeshGrid();

        // add orchestrator
        Orchestrator orchestrator =
                new Orchestrator(new Position(-1, 0), new FloodStrategy(meshGrid));
        meshGrid.addDevice(orchestrator);

        try {
            // read devices from layout file
            LayoutReader layoutReader = new LayoutReader();
            layoutReader.read();
            HashMap<Integer, Position> devices = layoutReader.getDevices();

            // add devices
            meshGrid.addDevices(devices);

            // generate manifests
            ManifestGenerator manifestGenerator =
                    new ManifestGenerator(nManifests, devices.keySet());
            manifestGenerator.generate();

            // read manifests
            ManifestReader manifestReader = new ManifestReader();
            manifestReader.read();
        } catch (IOException e) {
            e.printStackTrace();
        }

        System.out.println("Tick " + Logger.getInstance().getTick());
        orchestrator.sendMessage(orchestrator.createMessage(9, "Ola"));
        Logger.getInstance().nextTick();

        while (true) {
            System.out.println("Tick " + Logger.getInstance().getTick());
            if (!meshGrid.update()) System.out.println("No updates...");

            try {
                System.in.read();
            } catch (IOException e) {
                e.printStackTrace();
            }
            Logger.getInstance().nextTick();
        }
    }
}
