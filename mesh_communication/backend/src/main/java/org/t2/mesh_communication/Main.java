package org.t2.mesh_communication;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory;
import java.io.FileNotFoundException;
import java.io.IOException;
import org.t2.mesh_communication.config.Config;
import org.t2.mesh_communication.config.LayoutGenerator;
import org.t2.mesh_communication.config.LayoutReader;
import org.t2.mesh_communication.config.ManifestGenerator;
import org.t2.mesh_communication.devices.*;
import org.t2.mesh_communication.devices.comm_strat.FloodStrategy;

public class Main {
    public static void main(String[] args) {
        // generate layout and manifest
        LayoutGenerator layoutGenerator = new LayoutGenerator(9, 3, 3);
        ManifestGenerator generator = new ManifestGenerator(3);
        try {
            layoutGenerator.generate();
            generator.generate();
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

        try { // read devices from layout file
            LayoutReader layoutReader = new LayoutReader();
            layoutReader.read();
            // add devices
            meshGrid.addDevices(layoutReader.getDevices());

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }

        orchestrator.sendMessage(orchestrator.createMessage(9, "Ola"));

        int tick = 0;
        while (true) {
            System.out.println("Tick " + tick++);
            if (!meshGrid.update()) System.out.println("No updates...");

            try {
                System.in.read();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
