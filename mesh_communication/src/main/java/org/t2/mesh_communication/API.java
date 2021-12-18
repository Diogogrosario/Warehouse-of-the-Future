package org.t2.mesh_communication;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;
import org.t2.mesh_communication.config.Config;
import org.t2.mesh_communication.config.ManifestGenerator;
import org.t2.mesh_communication.devices.*;
import org.t2.mesh_communication.devices.comm_strat.FloodStrategy;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@SpringBootApplication
@RestController
public class API {
    @Autowired
    private MeshGrid meshGrid;

    public static void main(String[] args) {
        API api = new API();
        api.start();
        SpringApplication.run(API.class);
    }

    @PostConstruct
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
    }

    @GetMapping("/devices")
    public List<JsonNode> devices(@RequestParam(value = "id", defaultValue = "-1") int deviceID, HttpServletResponse response) {
        List<MeshDevice> devices = meshGrid.getDevices();
        for(MeshDevice dv : devices)
            System.out.println(dv.toJson());

        if (deviceID != -1) {
            MeshDevice device = null;
            for (MeshDevice dv : devices) {
                if (dv.getId() == deviceID) {
                    device = dv;
                    break;
                }
            }

            if (device == null) { //if the queried device does not exist - code 204
                response.setStatus(HttpServletResponse.SC_NO_CONTENT);
                return new ArrayList<>();
            }
            devices = new ArrayList<>(Collections.singleton(device));
        }

        List<JsonNode> devicesJson = new ArrayList<>();
        ObjectMapper mapper = new ObjectMapper();
        for (MeshDevice dv : devices) {
            try {
                devicesJson.add(mapper.readValue(dv.toJson(), JsonNode.class));
            } catch (JsonProcessingException e) {
                System.err.println("Error in JSON parsing of devices.");
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                return null;
            }
        }

        response.setStatus(HttpServletResponse.SC_OK);



        return devicesJson;
    }

    @PostMapping("/message")
    public String message(@RequestBody JsonNode body, HttpServletResponse response) {
        int destination;
        String content;
        try {
            destination = body.get("destination").asInt();
            content = body.get("content").asText();
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return "Invalid Request Body.";
        }

        this.meshGrid.sendRequest(destination, content);

        response.setStatus(HttpServletResponse.SC_OK);
        return "Request Sent.";
    }

    @PostMapping("/tick")
    public String tick(@RequestBody(required = false) JsonNode body, HttpServletResponse response) {
        int ticks = 1;
        if(body != null && body.has("n_ticks"))
            ticks = body.get("n_ticks").asInt();

        if(ticks < 1) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return "Invalid number of ticks.";
        }

        for (int i = 0; i < ticks; ++i) {
            this.meshGrid.update();
        }

        response.setStatus(HttpServletResponse.SC_OK);
        return "Mesh Grid Updated.";
    }
}
