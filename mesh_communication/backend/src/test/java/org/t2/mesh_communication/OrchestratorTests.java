package org.t2.mesh_communication;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.t2.mesh_communication.devices.*;
import org.t2.mesh_communication.devices.comm_strat.FloodStrategy;
import org.t2.mesh_communication.devices.components.Battery;
import org.t2.mesh_communication.devices.components.Screen;
import org.t2.mesh_communication.devices.messages.Message;
import org.t2.mesh_communication.devices.messages.ReplyMessage;
import org.t2.mesh_communication.devices.messages.RequestMessage;

public class OrchestratorTests {
    private static MeshDevice orchestrator;
    private static List<MeshDevice> devicesInRange;

    @BeforeAll
    static void init() {
        MeshGrid mg = Mockito.mock(MeshGrid.class);
        when(mg.getOrchestratorId()).thenReturn(0);
        Position pos = Mockito.mock(Position.class);

        orchestrator = new Orchestrator(0, pos, 1, new FloodStrategy(mg));

        Battery bat = new Battery(50, 7);
        Screen screen = new Screen(5, 10);
        devicesInRange = new ArrayList<>();
        devicesInRange.add(new Device(1, pos, new FloodStrategy(mg), 10, 10, 1, bat, screen));

        when(mg.devicesInRange(orchestrator)).thenReturn(devicesInRange);
    }

    @Test
    public void orchestratorTest() {
        Message msg = new RequestMessage(0, 0, 1, "");
        orchestrator.sendMessage(msg);
        assertEquals(orchestrator.getCommandsNext().size(), 0);
        orchestrator.update();
        assertEquals(orchestrator.getCommandsNext().size(), 0);
        assertEquals(orchestrator.getCommands().size(), 0);

        Message msgToReceive = new ReplyMessage(1, 0, 0, "");
        assertTrue(orchestrator.receiveMessage(msgToReceive));
    }
}
