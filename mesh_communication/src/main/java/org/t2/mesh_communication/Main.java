package org.t2.mesh_communication;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory;
import java.io.IOException;
import org.t2.mesh_communication.config.Config;
import org.t2.mesh_communication.config.ManifestGenerator;
import org.t2.mesh_communication.devices.*;

public class Main {
    public static void main(String[] args) {
        ManifestGenerator generator = new ManifestGenerator(3);
        try {
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

        // orchestrator and grid
        MeshGrid meshGrid = new MeshGrid();
        Orchestrator orchestrator = new Orchestrator(new Position(-1, 0), meshGrid);
        meshGrid.addDevice(orchestrator);
        // create the org.t2.mesh_communication.devices
        for (int i = 0; i < 9; ++i) {
            Device d = DeviceFactory.deviceFromConfig(i + 1, new Position(i % 3, i / 3), meshGrid);
            meshGrid.addDevice(d);
        }

        orchestrator.sendMessage(orchestrator.createMessage(9, "Ola"));

        int tick = 0;
        while (true) {
            System.out.println("Tick " + tick++);
            if (!meshGrid.update()) System.out.println("No updates...");
            ;
            try {
                System.in.read();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
