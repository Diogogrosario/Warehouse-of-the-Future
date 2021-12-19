package org.t2.mesh_communication;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory;
import java.io.IOException;
import java.util.*;
import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;
import org.t2.mesh_communication.config.*;
import org.t2.mesh_communication.devices.*;
import org.t2.mesh_communication.devices.comm_strat.FloodStrategy;
import org.t2.mesh_communication.devices.command.Command;
import org.t2.mesh_communication.devices.command.SendMsgCmd;
import org.t2.mesh_communication.devices.messages.Message;
import org.t2.mesh_communication.log.Logger;

@SpringBootApplication
@RestController
public class API {
    @Autowired private MeshGrid meshGrid;

    public static void main(String[] args) {
        API api = new API();
        api.start();
        SpringApplication.run(API.class);
    }

    @PostConstruct
    public void start() {
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

        this.meshGrid = new MeshGrid();
        Orchestrator orchestrator =
                new Orchestrator(new Position(-1, 0), new FloodStrategy(this.meshGrid));

        // add orchestrator
        this.meshGrid.addDevice(orchestrator);

        // read devices from layout file
        try {
            LayoutReader layoutReader = new LayoutReader();
            layoutReader.read();
            HashMap<Integer, Position> devices = layoutReader.getDevices();

            // add devices
            this.meshGrid.addDevices(devices);

            // generate manifests
            if (!ManifestGenerator.manifestFileExists()) {
                final int nManifests = 3;
                ManifestGenerator manifestGenerator =
                        new ManifestGenerator(nManifests, devices.keySet());
                manifestGenerator.generate();
            }

            // read manifests
            ManifestReader manifestReader = new ManifestReader();
            manifestReader.read();
            List<Product> products = manifestReader.getProducts();

            // orchestrator.orchestrate(products);
        } catch (IOException e) {
            e.printStackTrace();
        }

        orchestrator.sendMessage(orchestrator.createMessage(8, "padoru"));
    }

    @GetMapping("/devices/{status}")
    public List<JsonNode> devicesStatus(
            @PathVariable("status") String status, HttpServletResponse response) {
        List<MeshDevice> devices = new ArrayList<>();

        switch (status) {
            case "all":
                devices = this.meshGrid.getDevices();
                break;
            case "failed":
                for (MeshDevice dv : this.meshGrid.getDevices()) {
                    if (dv.getId() == MeshGrid.ORCHESTRATOR_ID
                            || ((Device) dv).getBattery().getRemainingBattery() <= 0) {
                        devices.add(dv);
                    }
                }
                break;
            case "operational":
                for (MeshDevice dv : this.meshGrid.getDevices()) {
                    if (dv.getId() == MeshGrid.ORCHESTRATOR_ID
                            || ((Device) dv).getBattery().getRemainingBattery() > 0) {
                        devices.add(dv);
                    }
                }
                break;
            default:
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                return new ArrayList<>();
        }

        if (devices.isEmpty()) {
            // device list is empty - request succeeds but there is no content
            response.setStatus(HttpServletResponse.SC_NO_CONTENT);
            return new ArrayList<>();
        }

        List<JsonNode> devicesJson;

        try {
            devicesJson = this.devicesToJson(devices);
        } catch (JsonProcessingException e) {
            System.err.println("Error in JSON parsing of device.");
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            return null;
        }

        response.setStatus(HttpServletResponse.SC_OK);

        return devicesJson;
    }

    @GetMapping("/devices/{id}")
    public JsonNode devices(@PathVariable("id") int deviceID, HttpServletResponse response) {
        List<MeshDevice> devices = meshGrid.getDevices();

        MeshDevice device = null;
        for (MeshDevice dv : devices) {
            if (dv.getId() == deviceID) {
                device = dv;
                break;
            }
        }

        if (device == null) { // if the queried device does not exist - code 404
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            return null;
        }

        JsonNode deviceJson;
        ObjectMapper mapper = new ObjectMapper();
        try {
            deviceJson = mapper.readValue(device.toJson(), JsonNode.class);
        } catch (JsonProcessingException e) {
            System.err.println("Error in JSON parsing of device.");
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            return null;
        }
        response.setStatus(HttpServletResponse.SC_OK);

        return deviceJson;
    }

    @GetMapping("/devices/inrange/{id}")
    public List<JsonNode> devicesInRange(
            @PathVariable("id") int deviceID, HttpServletResponse response) {

        MeshDevice device = null;
        for (MeshDevice dv : this.meshGrid.getDevices()) {
            if (dv.getId() == deviceID) {
                device = dv;
                break;
            }
        }

        if (device == null) { // if the queried device does not exist - code 404
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            return null;
        }

        List<MeshDevice> devicesInRange = this.meshGrid.devicesInRange(device);
        List<JsonNode> devicesRangeJson;
        try {
            devicesRangeJson = this.devicesToJson(devicesInRange);
        } catch (JsonProcessingException e) {
            System.err.println("Error in JSON parsing of device.");
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            return null;
        }

        response.setStatus(HttpServletResponse.SC_OK);
        return devicesRangeJson;
    }

    @PostMapping("/tick/{time_flow}")
    public String tick(
            @PathVariable("time_flow") String timeFlow,
            @RequestParam(value = "n_ticks", required = false, defaultValue = "1") int nTicks,
            HttpServletResponse response) {

        switch (timeFlow) {
            case "forwards":
                for (int i = 0; i < nTicks; ++i) {
                    this.meshGrid.update();
                    Logger.getInstance().nextTick();
                }
                break;
            case "backwards":
                // TODO: when UNDO ticks is implemented
                response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                return "Backwards time flow not implemented yet.";
            default:
                response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                return "Invalid time flow.";
        }

        response.setStatus(HttpServletResponse.SC_OK);
        return "Mesh Grid updated";
    }

    @GetMapping("/message")
    public ObjectNode message(HttpServletResponse response) {
        HashMap<Integer, ArrayNode> messages = new HashMap<>();
        ObjectMapper mapper = new ObjectMapper();

        for (MeshDevice receiver : this.meshGrid.getDevices()) {
            for (Command command : receiver.getCommands()) {
                if (!(command instanceof SendMsgCmd)) continue;
                SendMsgCmd curr_cmd = (SendMsgCmd) command;

                int sourceDevice = 0;
                JsonNode messageJson;
                try {
                    Message message = curr_cmd.getMessage();

                    System.out.println("Device: " + receiver.getId());
                    System.out.println("Last Hop: " + message.getLastHop());
                    System.out.println("Source: " + message.getSource());
                    System.out.println("Dest: " + message.getDestination());
                    System.out.println("Type: " + message.getType());
                    System.out.println(
                            "Message destinations: " + curr_cmd.getDestinations().size());
                    System.out.println("--------");
                    sourceDevice = message.getLastHop();
                    messageJson = this.messageJson(message.toJson(receiver.getId()));
                } catch (JsonProcessingException e) {
                    System.err.println("Error formatting message to JSON.");
                    response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                    return null;
                }
                if (!messages.containsKey(sourceDevice))
                    messages.put(
                            sourceDevice, mapper.convertValue(new ArrayList<>(), ArrayNode.class));
                messages.get(sourceDevice).add(messageJson);
            }
        }

        ObjectNode node = mapper.createObjectNode();

        for (Map.Entry<Integer, ArrayNode> entry : messages.entrySet()) {
            node.putIfAbsent(entry.getKey().toString(), entry.getValue());
        }

        response.setStatus(HttpServletResponse.SC_OK);
        return node;
    }

    private List<JsonNode> devicesToJson(List<MeshDevice> devices) throws JsonProcessingException {
        List<JsonNode> devicesJson = new ArrayList<>();
        ObjectMapper mapper = new ObjectMapper();
        for (MeshDevice dv : devices) {
            devicesJson.add(mapper.readValue(dv.toJson(), JsonNode.class));
        }
        return devicesJson;
    }

    private JsonNode messageJson(String messageJson) throws JsonProcessingException {
        JsonNode messageNode;
        ObjectMapper mapper = new ObjectMapper();

        messageNode = mapper.readValue(messageJson, JsonNode.class);

        return messageNode;
    }
}
