package org.t2.mesh_communication;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import java.io.IOException;
import java.io.InputStream;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.LogRecord;
import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.web.bind.annotation.*;
import org.t2.mesh_communication.devices.MeshDevice;
import org.t2.mesh_communication.devices.MeshGrid;
import org.t2.mesh_communication.devices.command.Command;
import org.t2.mesh_communication.devices.command.ReceiveMsgCmd;
import org.t2.mesh_communication.devices.command.SendMsgCmd;
import org.t2.mesh_communication.devices.messages.Message;
import org.t2.mesh_communication.log.Log;
import org.t2.mesh_communication.log.Logger;

@SpringBootApplication
@RestController
public class API implements ErrorController {
    @Autowired private Main main;

    public static void main(String[] args) {
        API api = new API();
        SpringApplication.run(API.class);
    }

    @PostConstruct
    public void start() {
        Main.prepareConfigs();
        try {
            main.prepareGrid();
        } catch (IOException e) {
            System.err.println("Failed to prepare mesh grid.");
            System.exit(1);
        }
    }

    public void overwriteWithFiles(String layoutFile, String manifestFile) {
        Main.prepareConfigs();
        try {
            this.main.clearMeshGrid();
            this.main.prepareGrid(layoutFile);
            this.main.clearProducts();
            this.main.readManifest(manifestFile);
        } catch (Exception e) {
            System.out.println("Error reading layout file!");
        }
    }

    private void resetStatus() throws IOException {
        this.main.clearMeshGrid();
        this.main.clearProducts();
        Main.prepareConfigs();
        this.main.prepareGrid();

        Logger.getInstance().resetLogger();
    }

    private void resetStatus(Map<String, Object> jsonObject) throws IOException {
        this.main.clearMeshGrid();
        this.main.clearProducts();
        Main.prepareConfigs();
        this.main.prepareGrid(jsonObject);

        Logger.getInstance().resetLogger();
    }

    private MeshGrid getMeshGrid() {
        return this.main.getMeshGrid();
    }

    public Main getMain() {
        return this.main;
    }

    public void setMain(Main main) {
        this.main = main;
    }

    @GetMapping("/")
    public String root(HttpServletResponse response) throws IOException, URISyntaxException {
        InputStream apiStream = API.class.getClassLoader().getResourceAsStream("api.html");
        assert apiStream != null;
        return new String(apiStream.readAllBytes());
    }

    @GetMapping({"/devices/{status}", "/devices"})
    @CrossOrigin
    public List<JsonNode> devicesStatus(
            @PathVariable(name = "status", required = false) String status,
            HttpServletResponse response) {

        List<MeshDevice> devices;
        if (status == null) status = "all";
        switch (status) {
            case "all" -> devices = this.getMeshGrid().getDevices();
            case "failed" -> devices =
                    this.getMeshGrid().getDevices().stream()
                            .filter(dv -> !dv.isOperational())
                            .toList();
            case "operational" -> devices =
                    this.getMeshGrid().getDevices().stream()
                            .filter(MeshDevice::isOperational)
                            .toList();
            default -> {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                return new ArrayList<>();
            }
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
    @CrossOrigin
    public JsonNode devices(@PathVariable("id") int deviceID, HttpServletResponse response) {
        List<MeshDevice> devices = this.getMeshGrid().getDevices();

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
    @CrossOrigin
    public List<JsonNode> devicesInRange(
            @PathVariable("id") int deviceID, HttpServletResponse response) {

        MeshDevice device = null;
        for (MeshDevice dv : this.getMeshGrid().getDevices()) {
            if (dv.getId() == deviceID) {
                device = dv;
                break;
            }
        }

        if (device == null) { // if the queried device does not exist - code 404
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            return null;
        }

        List<MeshDevice> devicesInRange = this.getMeshGrid().devicesInRange(device);

        if (devicesInRange.isEmpty()) {
            response.setStatus(HttpServletResponse.SC_NO_CONTENT);
            return new ArrayList<>();
        }

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

    @GetMapping("/devices/inrange/all")
    @CrossOrigin
    public ObjectNode allInRange(HttpServletResponse response) {

        HashMap<Integer, ArrayNode> inrangeAll = new HashMap<>();
        ObjectMapper mapper = new ObjectMapper();

        for (MeshDevice dv : this.getMeshGrid().getDevices()) {
            List<JsonNode> inrange;
            try {
                inrange = this.devicesToJson(this.getMeshGrid().devicesInRange(dv));
            } catch (JsonProcessingException e) {
                System.err.println("Error in JSON parsing of devices.");
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                return null;
            }

            if (inrange.isEmpty()) continue;

            ArrayNode inrangeArray = mapper.convertValue(inrange, ArrayNode.class);
            inrangeAll.put(dv.getId(), inrangeArray);
        }

        ObjectNode node = mapper.createObjectNode();

        if (inrangeAll.isEmpty()) {
            response.setStatus(HttpServletResponse.SC_NO_CONTENT);
            return node;
        }

        for (Map.Entry<Integer, ArrayNode> entry : inrangeAll.entrySet()) {
            node.putIfAbsent(entry.getKey().toString(), entry.getValue());
        }

        response.setStatus(HttpServletResponse.SC_OK);
        return node;
    }

    @PostMapping("/tick/{time_flow}")
    @CrossOrigin
    public String tick(
            @PathVariable("time_flow") String timeFlow,
            @RequestParam(value = "n_ticks", required = false, defaultValue = "1") int nTicks,
            HttpServletResponse response) {

        if (nTicks <= 0) return "NTicks must be a number of value higher than 0.";
        switch (timeFlow) {
            case "forwards":
                this.main.advanceTick(nTicks);
                break;
            case "backwards":
                int result = this.main.goBackTick(nTicks);
                if (result < 0) return "Invalid time flow: Can't undo that many ticks.";
                break;
            default:
                response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                return "Invalid time flow.";
        }

        response.setStatus(HttpServletResponse.SC_OK);
        return "Mesh Grid updated";
    }

    @PostMapping("/orchestrate")
    @CrossOrigin
    public String orchestrate(HttpServletResponse response) {
        this.main.orchestrate();
        response.setStatus(HttpServletResponse.SC_OK);
        return "Orchestrator orchestrated";
    }

    @GetMapping("/messages/receive")
    @CrossOrigin
    public ObjectNode messageReceive(HttpServletResponse response) {

        HashMap<Integer, ArrayNode> messages = new HashMap<>();
        ObjectMapper mapper = new ObjectMapper();

        for (MeshDevice md : this.getMeshGrid().getDevices()) {
            for (Command command : md.getCommands()) {
                if (command instanceof ReceiveMsgCmd rcvMsgCmd) {
                    JsonNode ret = handleRcvMsg(md, rcvMsgCmd);

                    if (ret == null) {
                        response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                        return null;
                    }

                    int sourceDevice = rcvMsgCmd.getMessage().getLastHop();
                    if (!messages.containsKey(sourceDevice)) {
                        messages.put(
                                sourceDevice,
                                mapper.convertValue(new ArrayList<>(), ArrayNode.class));
                    }
                    messages.get(sourceDevice).add(ret);
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

    @GetMapping("/messages/send")
    @CrossOrigin
    public ObjectNode messageSend(HttpServletResponse response) {

        HashMap<Integer, ArrayNode> messages = new HashMap<>();
        ObjectMapper mapper = new ObjectMapper();

        for (MeshDevice md : this.getMeshGrid().getDevices()) {
            for (Command command : md.getCommands()) {
                if (command instanceof SendMsgCmd sendMsgCmd) {
                    ArrayNode ret = handleSendMsg(md, sendMsgCmd);
                    if (ret == null) {
                        response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                        return null;
                    }
                    int sourceDevice = md.getId();
                    if (!messages.containsKey(sourceDevice)) messages.put(sourceDevice, ret);
                    else messages.get(sourceDevice).addAll(ret);
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

    private JsonNode handleRcvMsg(MeshDevice receiver, ReceiveMsgCmd rcvMsgCmd) {
        Message message = rcvMsgCmd.getMessage();
        try {
            return this.receiveMessageJson(
                    message.toJson(), receiver.getId(), rcvMsgCmd.isFailed());
        } catch (JsonProcessingException e) {
            System.err.println("Error formatting message to JSON.");
            return null;
        }
    }

    private ArrayNode handleSendMsg(MeshDevice sender, SendMsgCmd sendMsgCmd) {
        ObjectMapper mapper = new ObjectMapper();
        ArrayNode ret = mapper.convertValue(new ArrayList<>(), ArrayNode.class);

        List<MeshDevice> destinations = sender.getCommStrat().getDestsOfDevice(sender);
        Message message = sendMsgCmd.getMessage();
        try {
            for (MeshDevice dest : destinations) {
                JsonNode messageJson = this.messageJson(message.toJson(), dest.getId());
                ret.add(messageJson);
            }
        } catch (JsonProcessingException e) {
            System.err.println("Error formatting message to JSON.");
            return null;
        }

        return ret;
    }

    @GetMapping("/log")
    @CrossOrigin
    public ObjectNode log(HttpServletResponse response) {
        HashMap<String, ArrayNode> logs = new HashMap<>();
        ObjectMapper mapper = new ObjectMapper();
        ObjectNode node = mapper.createObjectNode();

        int currentTick = Logger.getInstance().getTick();

        // logs from history that are from the current tick
        // (currentTick - 1) -> currentTick represents the tick in which commands still haven't been
        // executed,
        // so we want the logs from the "previous" tick
        if (currentTick == 0) return node;
        List<LogRecord> history = Logger.getInstance().getHistory(currentTick - 1);

        for (LogRecord lr : history) {
            Log log = (Log) lr;
            String deviceName = log.getSourceClassName();
            if (!logs.containsKey(deviceName)) {
                ArrayNode emptyArray = mapper.convertValue(new ArrayList<>(), ArrayNode.class);
                logs.put(deviceName, emptyArray);
            }
            logs.get(deviceName).add(log.getMessage());
        }

        for (Map.Entry<String, ArrayNode> entry : logs.entrySet()) {
            node.putIfAbsent(entry.getKey(), entry.getValue());
        }

        response.setStatus(HttpServletResponse.SC_OK);
        return node;
    }

    @RequestMapping("/metrics")
    @ResponseBody
    @CrossOrigin
    public ObjectNode getMetrics(HttpServletResponse response) {
        ObjectMapper mapper = new ObjectMapper();
        ObjectNode node = mapper.createObjectNode();

        int totalInnitialBat = this.getMeshGrid().getTotalInitialBat();
        int currentBattery = this.getMeshGrid().getCurrentBat();
        int tickBattery = this.getMeshGrid().getLastTickBat() - currentBattery;
        if (tickBattery < 0) {
            tickBattery = 0;
        }
        int failedMsg = this.getMeshGrid().getFailedMessages();

        node.put("batTick", tickBattery);
        node.put("batCommunication", totalInnitialBat - currentBattery);
        node.put("failed", failedMsg);
        node.put("ticks", this.getMeshGrid().getNTicks());

        response.setStatus(HttpServletResponse.SC_OK);
        return node;
    }

    @PostMapping("/layout")
    @CrossOrigin
    public String layout(@RequestBody Map<String, Object> jsonObject, HttpServletResponse response)
            throws IOException {
        this.resetStatus(jsonObject);

        response.setStatus(HttpServletResponse.SC_OK);

        return "Layout successfully posted";
    }

    @RequestMapping("/error")
    @ResponseBody
    public String elPejo(HttpServletRequest request) {
        Integer statusCode = (Integer) request.getAttribute("javax.servlet.error.status_code");
        Exception exception = (Exception) request.getAttribute("javax.servlet.error.exception");
        return String.format(
                "<html><body><h2>Mesh Communication Error Page</h2><div>Status code: <b>%s</b></div>"
                        + "<div>Exception Message: <b>%s</b></div><body></html>",
                statusCode, exception == null ? "N/A" : exception.getMessage());
    }

    @PostMapping("/restart")
    @CrossOrigin
    public String restart(HttpServletResponse response) {
        try {
            this.resetStatus();
        } catch (IOException exception) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            return "Error resetting configurations";
        }
        return "Mesh status reset.";
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

    private JsonNode receiveMessageJson(String message, int receiver, boolean isFailed)
            throws JsonProcessingException {
        JsonNode node = messageJson(message, receiver);
        ((ObjectNode) node).put("failed", isFailed);
        return node;
    }
}
