package org.t2.mesh_communication;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;

import java.util.List;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.t2.mesh_communication.devices.Device;
import org.t2.mesh_communication.devices.MeshGrid;
import org.t2.mesh_communication.devices.Position;
import org.t2.mesh_communication.devices.comm_strat.FloodStrategy;
import org.t2.mesh_communication.devices.command.Command;
import org.t2.mesh_communication.devices.command.SendMsgCmd;
import org.t2.mesh_communication.devices.components.Battery;
import org.t2.mesh_communication.devices.components.Screen;
import org.t2.mesh_communication.devices.messages.Message;
import org.t2.mesh_communication.devices.messages.ReplyMessage;
import org.t2.mesh_communication.devices.messages.RequestMessage;

public class CommunicationTests {
    private static Device device;

    @BeforeAll
    static void init() {
        MeshGrid mg = Mockito.mock(MeshGrid.class);
        Position pos = Mockito.mock(Position.class);
        Battery bat = Mockito.mock(Battery.class);
        Screen screen = Mockito.mock(Screen.class);

        device = new Device(1, pos, new FloodStrategy(mg), 10, 10, 1, bat, screen);
    }

    @Test
    void requestReplyTest() {
        RequestMessage req = new RequestMessage(0, 0, 1, "Request.");
        device.receiveMessage(req);

        List<Command> cmds = device.getNextCommands();
        assertFalse(cmds.isEmpty());

        SendMsgCmd cmd = (SendMsgCmd) cmds.get(0);
        Message msg = cmd.getMessage();

        assertEquals(ReplyMessage.type, msg.getType());
        assertEquals(cmd.getMessage().getSource(), 1);
        assertEquals(cmd.getMessage().getDestination(), 0);
    }
}
