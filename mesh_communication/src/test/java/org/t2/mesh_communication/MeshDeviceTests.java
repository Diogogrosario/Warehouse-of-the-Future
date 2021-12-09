package org.t2.mesh_communication;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.t2.mesh_communication.devices.Device;
import org.t2.mesh_communication.devices.MeshDevice;
import org.t2.mesh_communication.devices.MeshGrid;
import org.t2.mesh_communication.devices.Position;
import org.t2.mesh_communication.devices.comm_strat.FloodStrategy;
import org.t2.mesh_communication.devices.command.ReceiveMsgCmd;
import org.t2.mesh_communication.devices.components.Battery;
import org.t2.mesh_communication.devices.components.Screen;
import org.t2.mesh_communication.devices.messages.Message;
import org.t2.mesh_communication.devices.messages.RequestMessage;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class MeshDeviceTests {
  public static MeshDevice device;
  public static MeshDevice fake;

  @BeforeAll
  static void init() {
    MeshGrid mg = Mockito.mock(MeshGrid.class);
    Battery bat = new Battery(50, 7);
    Screen screen = new Screen(5, 10);
    Position pos = new Position(1, 1);
    Position fakePos = new Position(1, 2);

    device = new Device(1, pos, new FloodStrategy(mg), 10, 10, bat, screen);
    fake = new Device(2, fakePos, new FloodStrategy(mg), 10, 10, bat, screen);

    List<MeshDevice> devicesInRange = new ArrayList<>();
    devicesInRange.add(new Device(2, pos, new FloodStrategy(mg), 10, 10, bat, screen));

    Mockito.when(mg.devicesInRange(device)).thenReturn(devicesInRange);
  }

  @Test
  public void meshDeviceTests() {
    int seqNumberCopy = device.getSeqNum();
    int destination = 2;
    String content = "";
    Message nextMsg = device.createMessage(destination, content);
    assertEquals(seqNumberCopy + 1, device.getSeqNum());

    Message expected = new RequestMessage(device.getId(), device.getSeqNum(), destination, content);
    assertEquals(expected.getSource(), nextMsg.getSource());
    assertEquals(expected.getSeq(), nextMsg.getSeq());
    assertEquals(expected.getDestination(), nextMsg.getDestination());
    assertEquals(expected.getContent(), nextMsg.getContent());

    HashMap<Integer, Integer> devicesLife = new HashMap<>();
    int TTL = FloodStrategy.DEFAULT_TTL;
    devicesLife.put(2, TTL - 1);
    device.getNeighborTTLs().put(2, TTL);
    for (int i = 0; i < TTL; i++)
      device.sendMessage(new RequestMessage(device.getId(), device.getSeqNum(), 2, ""));

    assertEquals(devicesLife, device.getNeighborTTLs());

    device.addCommand(
        new ReceiveMsgCmd(device, new RequestMessage(device.getId(), device.getSeqNum(), 0, "")));
    assertEquals(0, device.getCommands().size());
    assertNotEquals(0, device.getCommandsNext().size());
    assertFalse(device.update());
    assertEquals(0, device.getCommands().size());
    assertNotEquals(0, device.getCommandsNext().size());
  }
}
