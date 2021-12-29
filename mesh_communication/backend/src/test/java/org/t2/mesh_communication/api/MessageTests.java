package org.t2.mesh_communication.api;

import com.fasterxml.jackson.databind.node.ObjectNode;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import org.mockito.stubbing.Answer;
import org.t2.mesh_communication.API;
import org.t2.mesh_communication.Main;
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

import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.LogRecord;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

public class MessageTests {
        private static API api;
        private static MeshGrid mg;

        @BeforeAll
        public static void init() {
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
