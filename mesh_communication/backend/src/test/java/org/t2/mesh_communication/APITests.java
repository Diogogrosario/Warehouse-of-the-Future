package org.t2.mesh_communication;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.LogRecord;
import javax.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.*;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import org.mockito.stubbing.Answer;
import org.t2.mesh_communication.devices.Device;
import org.t2.mesh_communication.devices.MeshDevice;
import org.t2.mesh_communication.devices.MeshGrid;
import org.t2.mesh_communication.devices.Position;
import org.t2.mesh_communication.devices.comm_strat.CommunicationStrategy;
import org.t2.mesh_communication.devices.comm_strat.FloodStrategy;
import org.t2.mesh_communication.devices.command.Command;
import org.t2.mesh_communication.devices.command.SendMsgCmd;
import org.t2.mesh_communication.devices.components.Battery;
import org.t2.mesh_communication.devices.components.Screen;
import org.t2.mesh_communication.devices.messages.RequestMessage;
import org.t2.mesh_communication.log.Log;
import org.t2.mesh_communication.log.Logger;

public class APITests {

    @Nested
    class TestNest {
        private static API api;
        private static MeshGrid mg;

        @BeforeAll
        static void init() {
            api = new API();
            mg = Mockito.mock(MeshGrid.class);
            MeshGrid mg = Mockito.mock(MeshGrid.class);

            Position pos = new Position(1, 1);
            Battery bat = new Battery(50, 7);
            Screen screen = new Screen(5, 10);
            Device device1 = new Device(1, pos, new FloodStrategy(mg), 10, 10, bat, screen);

            Position pos2 = new Position(1, 1);
            Battery bat2 = new Battery(50, 7);
            Screen screen2 = new Screen(5, 10);
            Device device2 = new Device(2, pos2, new FloodStrategy(mg), 10, 10, bat2, screen2);

            when(mg.getDevices())
                    .thenAnswer(
                            (Answer<List<MeshDevice>>)
                                    invocation -> {
                                        List<MeshDevice> lmd = new ArrayList<>();
                                        lmd.add(device1);
                                        lmd.add(device2);
                                        return lmd;
                                    });

            when(mg.devicesInRange(device1))
                    .thenAnswer(
                            (Answer<List<MeshDevice>>)
                                    invocation -> {
                                        List<MeshDevice> lmd = new ArrayList<>();
                                        lmd.add(device2);
                                        return lmd;
                                    });

            when(mg.devicesInRange(device2))
                    .thenAnswer(
                            (Answer<List<MeshDevice>>)
                                    invocation -> {
                                        List<MeshDevice> lmd = new ArrayList<>();
                                        lmd.add(device1);
                                        return lmd;
                                    });

            Main main = new Main();
            main.setMeshGrid(mg);
            api.setMain(main);
        }

        private String listToString(List<JsonNode> in) {
            StringBuilder out = new StringBuilder("[");
            for (int i = 0; i < in.size(); i++) {
                out.append(in.get(i).toString());
                if (i != in.size() - 1) out.append(", ");
            }
            out.append("]");

            return out.toString();
        }

        @Test
        public void getDevicesTest() {
            String expectedOutput =
                    "[{\"id\":1,\"battery_max\":50,\"battery_level\":50,\"position\":{\"x\":1,\"y\":1}}, {\"id\":2,\"battery_max\":50,\"battery_level\":50,\"position\":{\"x\":1,\"y\":1}}]";
            List<JsonNode> output =
                    api.devicesStatus("all", Mockito.mock(HttpServletResponse.class));

            String outputString = listToString(output);

            assertEquals(expectedOutput, outputString.toString());

            List<JsonNode> outputFail =
                    api.devicesStatus("failed", Mockito.mock(HttpServletResponse.class));

            assertEquals("[]", outputFail.toString());

            List<JsonNode> outputInvalid =
                    api.devicesStatus("invalidParameter", Mockito.mock(HttpServletResponse.class));

            assertEquals("[]", outputFail.toString());
        }

        @Test
        public void getSpecificDeviceTest() {
            String expectedOutput =
                    "{\"id\":1,\"battery_max\":50,\"battery_level\":50,\"position\":{\"x\":1,\"y\":1}}";
            JsonNode output = api.devices(1, Mockito.mock(HttpServletResponse.class));
            assertEquals(expectedOutput, output.toString());

            int invalidID = 23;
            JsonNode outputInvalid =
                    api.devices(invalidID, Mockito.mock(HttpServletResponse.class));
            assertNull(outputInvalid);
        }

        @Test
        public void getInRangeDevicesTest() {
            String expectedOutput =
                    "[{\"id\":2,\"battery_max\":50,\"battery_level\":50,\"position\":{\"x\":1,\"y\":1}}]";
            List<JsonNode> output = api.devicesInRange(1, Mockito.mock(HttpServletResponse.class));

            String outputString = listToString(output);
            assertEquals(expectedOutput, outputString);
        }

        @Test
        public void getAllInRangeDevicesTest() {
            ObjectNode output = api.allInRange(Mockito.mock(HttpServletResponse.class));
            assertFalse(output.isEmpty());

            assertTrue(output.has("1"));
            assertTrue(output.has("2"));

            assertTrue(output.get("1").isArray());
            assertTrue(output.get("2").isArray());

            assertEquals(1, output.get("1").size());
            assertEquals(1, output.get("2").size());

            String expectedDevice2 =
                    "{\"id\":2,\"battery_max\":50,\"battery_level\":50,\"position\":{\"x\":1,\"y\":1}}";
            assertEquals(expectedDevice2, output.get("1").get(0).toString());

            String expectedDevice1 =
                    "{\"id\":1,\"battery_max\":50,\"battery_level\":50,\"position\":{\"x\":1,\"y\":1}}";
            assertEquals(expectedDevice1, output.get("2").get(0).toString());
        }

        @Test
        public void tickTest() {
            String output = api.tick("forwards", 1, Mockito.mock(HttpServletResponse.class));
            assertEquals("Mesh Grid updated", output);

            String outputInvalidTimeflow =
                    api.tick("invalid", 1, Mockito.mock(HttpServletResponse.class));
            assertEquals("Invalid time flow.", outputInvalidTimeflow);

            String outputNegTicks =
                    api.tick("forwards", -1, Mockito.mock(HttpServletResponse.class));
            assertEquals("NTicks must be a number of value higher than 0.", outputNegTicks);
        }
    }

    @Nested
    class TestMessage {
        private static API api;
        private static MeshGrid mg;

        @BeforeAll
        static void init() {
            api = new API();
            mg = Mockito.mock(MeshGrid.class);
            MeshGrid mg = Mockito.mock(MeshGrid.class);
            FloodStrategy fs = Mockito.mock(FloodStrategy.class);

            Position pos = new Position(1, 1);
            Battery bat = new Battery(50, 7);
            Screen screen = new Screen(5, 10);
            Device device1 = new Device(1, pos, new FloodStrategy(mg), 10, 10, bat, screen);

            Position pos2 = new Position(1, 1);
            Battery bat2 = new Battery(50, 7);
            Screen screen2 = new Screen(5, 10);
            Device device2 = new Device(2, pos2, new FloodStrategy(mg), 10, 10, bat2, screen2);

            Device dvc = Mockito.mock(Device.class);

            when(dvc.getCommands())
                    .thenAnswer(
                            (Answer<List<Command>>)
                                    invocation -> {
                                        List<Command> lcmd = new ArrayList<>();
                                        lcmd.add(
                                                new SendMsgCmd(
                                                        device2,
                                                        new RequestMessage(1, 1, 2, "test")));
                                        return lcmd;
                                    });

            when(fs.getDestsOfDevice(dvc))
                    .thenAnswer(
                            (Answer<List<MeshDevice>>)
                                    invocation -> {
                                        List<MeshDevice> lmd = new ArrayList<>();
                                        lmd.add(device1);
                                        return lmd;
                                    });

            when(dvc.getCommStrat()).thenAnswer((Answer<CommunicationStrategy>) invocation -> fs);

            when(mg.getDevices())
                    .thenAnswer(
                            (Answer<List<MeshDevice>>)
                                    invocation -> {
                                        List<MeshDevice> lmd = new ArrayList<>();
                                        lmd.add(device1);
                                        lmd.add(device2);
                                        lmd.add(dvc);
                                        return lmd;
                                    });

            when(mg.devicesInRange(device1))
                    .thenAnswer(
                            (Answer<List<MeshDevice>>)
                                    invocation -> {
                                        List<MeshDevice> lmd = new ArrayList<>();
                                        lmd.add(device2);
                                        return lmd;
                                    });

            Main main = new Main();
            main.setMeshGrid(mg);
            api.setMain(main);
        }

        @Test
        public void messageTest() {
            String expectedOutput = "{\"0\":[{\"final\":2,\"hop\":1}]}";
            ObjectNode outputMessage = api.messageSend(Mockito.mock(HttpServletResponse.class));
            assertEquals(expectedOutput, outputMessage.toString());

            expectedOutput = "{}";
            outputMessage = api.messageReceive(Mockito.mock(HttpServletResponse.class));
            assertEquals(expectedOutput, outputMessage.toString());
        }
    }

    @Test
    public void getLogTest() {
        API api = new API();
        MockedStatic<Logger> logger = Mockito.mockStatic(Logger.class);
        Logger logger1 = Mockito.mock(Logger.class);

        LogRecord record1 =
                new Log(
                        "Device 1",
                        "Receive message [source=%d], [msg=%s], [lastHop=%d]",
                        0,
                        "test message 1",
                        0);
        record1.setSequenceNumber(1);

        LogRecord record2 =
                new Log(
                        "Device 2",
                        "Receive message [source=%d], [msg=%s], [lastHop=%d]",
                        1,
                        "test message 2",
                        3);
        record2.setSequenceNumber(1);

        LogRecord record3 =
                new Log("Device 2", "Sent message [destination=%d], [msg=%s]", 4, "test message 3");
        record3.setSequenceNumber(1);

        when(logger1.getHistory())
                .thenAnswer(
                        (Answer<List<LogRecord>>)
                                invocation -> {
                                    List<LogRecord> records = new ArrayList<>();
                                    records.add(record1);
                                    records.add(record2);
                                    records.add(record3);
                                    return records;
                                });

        when(logger1.getTick()).thenReturn(2);

        logger.when(Logger::getInstance).thenReturn(logger1);

        ObjectNode response = api.log(Mockito.mock(HttpServletResponse.class));

        assertTrue(response.has("Device 1"));
        assertTrue(response.has("Device 2"));

        assertEquals(1, response.get("Device 1").size());
        assertEquals(2, response.get("Device 2").size());

        assertEquals(
                "\"Receive message [source=0], [msg=test message 1], [lastHop=0]\"",
                response.get("Device 1").get(0).toString());
        assertEquals(
                "\"Receive message [source=1], [msg=test message 2], [lastHop=3]\"",
                response.get("Device 2").get(0).toString());
        assertEquals(
                "\"Sent message [destination=4], [msg=test message 3]\"",
                response.get("Device 2").get(1).toString());
    }
}
