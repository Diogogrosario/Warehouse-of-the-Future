package org.t2.mesh_communication;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import java.io.IOException;
import java.util.*;
import java.util.logging.LogRecord;
import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;
import org.t2.mesh_communication.config.*;
import org.t2.mesh_communication.devices.*;
import org.t2.mesh_communication.devices.command.Command;
import org.t2.mesh_communication.devices.command.SendMsgCmd;
import org.t2.mesh_communication.devices.messages.Message;
import org.t2.mesh_communication.log.Log;
import org.t2.mesh_communication.log.Logger;

@SpringBootApplication
@RestController
public class API {
    @Autowired private MeshGrid meshGrid;

    public static void main(String[] args) {
        API api = new API();
        SpringApplication.run(API.class);
    }

    @PostConstruct
    public void start() {
        Main.prepareConfigs();
        Main m = new Main();
        try {
            m.prepareGrid();
        } catch (IOException e) {
            System.err.println("Failed to prepare mesh grid.");
            System.exit(1);
        }
        this.meshGrid = m.getMeshGrid();
    }

    @GetMapping("/devices/{status}")
    public List<JsonNode> devicesStatus(
            @PathVariable("status") String status, HttpServletResponse response) {
        response.addHeader("Access-Control-Allow-Origin", "*");

        List<MeshDevice> devices;
        switch (status) {
            case "all":
                devices = this.meshGrid.getDevices();
                break;
            case "failed":
                devices =
                        this.meshGrid.getDevices().stream()
                                .filter(dv -> !dv.isOperational())
                                .toList();
                break;
            case "operational":
                devices =
                        this.meshGrid.getDevices().stream()
                                .filter(MeshDevice::isOperational)
                                .toList();
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

    @GetMapping("/device/{id}")
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
        /*
        Use an ObjectMapper to convert the JSON string into a JsonNode.
        This makes the requests with JSON responses more easily testable, provides easier construction of JSON node
        arrays and assures a consistent formatting of the JSON strings across all requests.
        */
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
        response.addHeader("Access-Control-Allow-Origin", "*");

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
        response.addHeader("Access-Control-Allow-Origin", "*");

        if (nTicks <= 0) return "NTicks must be a number of value higher than 0.";
        switch (timeFlow) {
            case "forwards":
                for (int i = 0; i < nTicks; ++i) {
                    this.meshGrid.update();
                    Logger.getInstance().nextTick();
                }
                break;
            case "backwards":
                // TODO: when UNDO ticks is implemented
                response.setStatus(HttpServletResponse.SC_NOT_IMPLEMENTED);
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
        response.addHeader("Access-Control-Allow-Origin", "*");

        HashMap<Integer, ArrayNode> messages = new HashMap<>();
        ObjectMapper mapper = new ObjectMapper();

        for (MeshDevice sender : this.meshGrid.getDevices()) {
            for (Command command : sender.getCommands()) {
                if (!(command instanceof SendMsgCmd sendMsgCmd)) continue;

                List<MeshDevice> destinations = sender.getCommStrat().getDestsOfDevice(sender);
                Message message = sendMsgCmd.getMessage();
                int sourceDevice = sender.getId();
                try {
                    for (MeshDevice dest : destinations) {
                        JsonNode messageJson = this.messageJson(message.toJson(), dest.getId());
                        if (!messages.containsKey(sourceDevice)) {
                            ArrayNode emptyArray =
                                    mapper.convertValue(new ArrayList<>(), ArrayNode.class);
                            messages.put(sourceDevice, emptyArray);
                        }
                        messages.get(sourceDevice).add(messageJson);
                    }
                } catch (JsonProcessingException e) {
                    System.err.println("Error formatting message to JSON.");
                    response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                    return null;
                }
            }
        }

        ObjectNode node = mapper.createObjectNode();
        for (Map.Entry<Integer, ArrayNode> entry : messages.entrySet()) {
            node.putIfAbsent(entry.getKey().toString(), entry.getValue());
        }

        response.setStatus(HttpServletResponse.SC_OK);
        return node;
    }

    @GetMapping("/log")
    public ObjectNode log(HttpServletResponse response) {
        HashMap<String, ArrayNode> logs = new HashMap<>();
        ObjectMapper mapper = new ObjectMapper();

        int currentTick = Logger.getInstance().getTick();

        List<LogRecord> history = Logger.getInstance().getHistory();

        // logs from history that are from the current tick
        // (currentTick - 1) -> currentTick represents the tick in which commands still haven't been
        // executed,
        // so we want the logs from the "previous" tick
        history = history.stream().filter(l -> l.getSequenceNumber() == currentTick - 1).toList();

        for (LogRecord lr : history) {
            Log log = (Log) lr;
            String deviceName = log.getSourceClassName();
            if (!logs.containsKey(deviceName)) {
                ArrayNode emptyArray = mapper.convertValue(new ArrayList<>(), ArrayNode.class);
                logs.put(deviceName, emptyArray);
            }
            logs.get(deviceName).add(log.getMessage());
        }

        ObjectNode node = mapper.createObjectNode();
        for (Map.Entry<String, ArrayNode> entry : logs.entrySet()) {
            node.putIfAbsent(entry.getKey(), entry.getValue());
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

    private JsonNode messageJson(String messageJson, int receiver) throws JsonProcessingException {
        ObjectNode messageNode;
        ObjectMapper mapper = new ObjectMapper();

        messageNode = (ObjectNode) mapper.readValue(messageJson, JsonNode.class);
        messageNode.put("hop", receiver);

        return messageNode;
    }

    public void setMeshGrid(MeshGrid meshGrid) {
        this.meshGrid = meshGrid;
    }

    public MeshGrid getMeshGrid() {
        return this.meshGrid;
    }
}
