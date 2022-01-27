package org.t2.mesh_communication;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.t2.mesh_communication.devices.Device;
import org.t2.mesh_communication.devices.MeshDevice;
import org.t2.mesh_communication.devices.MeshGrid;
import org.t2.mesh_communication.devices.Position;
import org.t2.mesh_communication.devices.comm_strat.FloodStrategy;
import org.t2.mesh_communication.devices.command.SendMsgCmd;
import org.t2.mesh_communication.devices.components.Battery;
import org.t2.mesh_communication.devices.components.Screen;
import org.t2.mesh_communication.devices.messages.Message;
import org.t2.mesh_communication.devices.messages.RequestMessage;

public class CommandTests {
    private static MeshDevice device;
    private static List<MeshDevice> devicesInRange;

    @BeforeAll
    static void init() {
        MeshGrid mg = Mockito.mock(MeshGrid.class);
        Position pos = Mockito.mock(Position.class);

        Battery bat = new Battery(50, 7);

        Screen screen = new Screen(5, 10);

        device = new Device(1, pos, new FloodStrategy(mg), 10, 10, 1, bat, screen);

        devicesInRange = new ArrayList<>();
        devicesInRange.add(new Device(2, pos, new FloodStrategy(mg), 10, 10, 1, bat, screen));

        Mockito.when(mg.devicesInRange(device)).thenReturn(devicesInRange);
    }

    @Test
    public void commandTest() {
        Message msg = new RequestMessage(device.getId(), 0, 0, "");
        SendMsgCmd sendMsgCmd = new SendMsgCmd(device, msg);
        sendMsgCmd.execute();
        assertEquals(device.getCommandsNext().size(), 0);
        device.update();
        assertEquals(device.getCommandsNext().size(), 0);
        assertEquals(device.getCommands().size(), 0);
    }
}
