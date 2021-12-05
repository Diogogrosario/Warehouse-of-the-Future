package org.t2.mesh_communication;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.t2.mesh_communication.devices.Device;
import org.t2.mesh_communication.devices.MeshGrid;
import org.t2.mesh_communication.devices.Position;
import org.t2.mesh_communication.devices.components.Battery;
import org.t2.mesh_communication.devices.components.Screen;
import org.t2.mesh_communication.devices.messages.Message;
import org.t2.mesh_communication.devices.messages.ReplyMessage;

public class BatteryTests {
    private static Device device;

    @BeforeAll
    static void init() {
        MeshGrid mg = Mockito.mock(MeshGrid.class);
        Position pos = Mockito.mock(Position.class);
        Battery bat = new Battery(50, 5);

        Screen screen = new Screen(5, 10);

        device = new Device(1, pos, mg, 10, 10, bat, screen);
    }

    @Test
    void sendConsumptionTest() {
        int startBattery = device.getBattery().getRemainingBattery();
        int expectedBattery = startBattery - device.getSendingConsumption();

        Message msg = new ReplyMessage(0, 0, 0, "");
        device.sendMessage(msg);

        int finalBattery = device.getBattery().getRemainingBattery();
        assertEquals(expectedBattery, finalBattery);
    }

    @Test
    void receiveConsumptionTest() {
        int startBattery = device.getBattery().getRemainingBattery();
        int expectedBattery = startBattery - device.getReceivingConsumption();

        Message msg = new ReplyMessage(0, 0, 0, "");
        device.receiveMessage(msg);

        int finalBattery = device.getBattery().getRemainingBattery();
        assertEquals(expectedBattery, finalBattery);
    }

    @Test
    void updateConsumptionTest() {
        int startBattery = device.getBattery().getRemainingBattery();

        int batConsumption = device.getBattery().getTickConsumption();
        int screenConsumption = device.getScreen().getTickConsumption();
        int expectedBattery = startBattery - batConsumption - screenConsumption;

        device.update();

        int finalBattery = device.getBattery().getRemainingBattery();
        assertEquals(expectedBattery, finalBattery);
    }
}
