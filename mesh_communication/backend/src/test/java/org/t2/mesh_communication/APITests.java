package org.t2.mesh_communication;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.junit.jupiter.api.*;
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

import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.when;

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

            when(mg.getDevices()).thenAnswer(
                    (Answer<List<MeshDevice>>) invocation -> {
                        List<MeshDevice> lmd = new ArrayList<>();
                        lmd.add(device1);
                        lmd.add(device2);
                        return lmd;
                    });

            when(mg.devicesInRange(device1)).thenAnswer(
                    (Answer<List<MeshDevice>>) invocation -> {
                        List<MeshDevice> lmd = new ArrayList<>();
                        lmd.add(device2);
                        return lmd;
                    });

            api.setMeshGrid(mg);
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
            String expectedOutput = "[{\"device_id\":1,\"battery_level\":50,\"position\":{\"x\":1,\"y\":1}}, {\"device_id\":2,\"battery_level\":50,\"position\":{\"x\":1,\"y\":1}}]";
            List<JsonNode> output = api.devicesStatus("all", Mockito.mock(HttpServletResponse.class));

            String outputString = listToString(output);

            assertEquals(outputString.toString(), expectedOutput);

            List<JsonNode> outputFail = api.devicesStatus("failed", Mockito.mock(HttpServletResponse.class));

            assertEquals("[]", outputFail.toString());

            List<JsonNode> outputInvalid = api.devicesStatus("invalidParameter", Mockito.mock(HttpServletResponse.class));

            assertEquals("[]", outputFail.toString());
        }

        @Test
        public void getSpecificDeviceTest() {
            String expectedOutput = "{\"device_id\":1,\"battery_level\":50,\"position\":{\"x\":1,\"y\":1}}";
            JsonNode output = api.devices(1, Mockito.mock(HttpServletResponse.class));
            assertEquals(expectedOutput, output.toString());

            JsonNode outputInvalid = api.devices(23, Mockito.mock(HttpServletResponse.class));
            assertNull(outputInvalid);
        }

        @Test
        public void getInRangeDevicesTest() {
            String expectedOutput = "[{\"device_id\":2,\"battery_level\":50,\"position\":{\"x\":1,\"y\":1}}]";
            List<JsonNode> output = api.devicesInRange(1, Mockito.mock(HttpServletResponse.class));

            String outputString = listToString(output);
            assertEquals(expectedOutput, outputString);
        }

        @Test
        public void tickTest() {
            String output = api.tick("forwards", 1, Mockito.mock(HttpServletResponse.class));
            assertEquals("Mesh Grid updated", output);

            String outputInvalidTimeflow = api.tick("invalid", 1, Mockito.mock(HttpServletResponse.class));
            assertEquals("Invalid time flow.", outputInvalidTimeflow);

            String outputNegTicks = api.tick("forwards", -1, Mockito.mock(HttpServletResponse.class));
            assertEquals("NTicks must be a number of value higher than 0.", outputNegTicks);
        }
    }

    @Nested
    class TestMessage
    {
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

            when(dvc.getCommands()).thenAnswer(
                    (Answer<List<Command>>) invocation -> {
                        List<Command> lcmd = new ArrayList<>();
                        lcmd.add(new SendMsgCmd(device2, new RequestMessage(1, 1, 2, "test")));
                        return lcmd;
                    });

            when(fs.getDestsOfDevice(dvc)).thenAnswer(
                    (Answer<List<MeshDevice>>) invocation -> {
                        List<MeshDevice> lmd = new ArrayList<>();
                        lmd.add(device1);
                        return lmd;
                    });

            when(dvc.getCommStrat()).thenAnswer(
                    (Answer<CommunicationStrategy>) invocation -> fs);

            when(mg.getDevices()).thenAnswer(
                    (Answer<List<MeshDevice>>) invocation -> {
                        List<MeshDevice> lmd = new ArrayList<>();
                        lmd.add(device1);
                        lmd.add(device2);
                        lmd.add(dvc);
                        return lmd;
                    });

            when(mg.devicesInRange(device1)).thenAnswer(
                    (Answer<List<MeshDevice>>) invocation -> {
                        List<MeshDevice> lmd = new ArrayList<>();
                        lmd.add(device2);
                        return lmd;
                    });
            api.setMeshGrid(mg);
        }

        @Test
        public void messageTest()
        {
            String expectedOutput = "{\"0\":[{\"hop\":1,\"final\":2,\"failed\":\"false\"}]}";
            ObjectNode outputInvalidTimeflow = api.message(Mockito.mock(HttpServletResponse.class));
            assertEquals(expectedOutput, outputInvalidTimeflow.toString());
        }
    }
}
