package org.t2.mesh_communication;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.t2.mesh_communication.config.Config;
import org.t2.mesh_communication.config.ManifestGenerator;
import org.t2.mesh_communication.devices.*;
import org.t2.mesh_communication.devices.comm_strat.FloodStrategy;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
@RestController
public class API {
    MeshGrid meshGrid;

    public static void main(String[] args) {
        API api = new API();
        api.start();
    }

    public void start() {
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
        this.meshGrid = new MeshGrid();
        Orchestrator orchestrator =
                new Orchestrator(new Position(-1, 0), new FloodStrategy(this.meshGrid));
        this.meshGrid.addDevice(orchestrator);
        // create the org.t2.mesh_communication.devices
        for (int i = 0; i < 9; ++i) {
            Device d =
                    DeviceFactory.deviceFromConfig(
                            i + 1, new Position(i % 3, i / 3), new FloodStrategy(this.meshGrid));
            this.meshGrid.addDevice(d);
        }
        SpringApplication.run(API.class);
    }

    @GetMapping("/devices")
    public String getDevices(@RequestParam(value = "device", defaultValue = "-1") int deviceID, HttpServletResponse response) {
        List<MeshDevice> devices = new ArrayList<>();
        devices = meshGrid.getDevices();
        if (deviceID != -1) {
            MeshDevice device = null;
            for (MeshDevice dv : devices) {
                if (dv.getId() == deviceID) {
                    device = dv;
                    break;
                }
            }
            devices.clear();

            if (device == null) {
                response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                return "The specified ID does not exist";
            }
            devices.add(device);
        }
        response.setStatus(HttpServletResponse.SC_OK);

        StringBuilder ret = new StringBuilder("[");
        for (MeshDevice dv : devices) {
            ret.append(dv.toJson());
        }
        return ret + "]";
    }
}
