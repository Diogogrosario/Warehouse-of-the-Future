package org.t2.mesh_communication;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.t2.mesh_communication.devices.Device;
import org.t2.mesh_communication.devices.MeshGrid;
import org.t2.mesh_communication.devices.Position;
import org.t2.mesh_communication.devices.comm_strat.FloodStrategy;
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
        Battery bat = new Battery(50, 7);

        Screen screen = new Screen(5, 10);

        device = new Device(1, pos, new FloodStrategy(mg), 10, 10, 1, bat, screen);
    }

    @Test
    void sendConsumptionTest() {
        int startBattery = device.getBattery().getRemainingBattery();
        int expectedBattery = startBattery - device.getSendingConsumption();

        Message msg = new ReplyMessage(0, 0, 0, "");
        device.sendMessage(msg);

        int finalBattery = device.getBattery().getRemainingBattery();
        assertEquals(40, finalBattery);

        device.rechargeBattery();
    }

    @Test
    void receiveConsumptionTest() {

        Message msg = new ReplyMessage(0, 0, 0, "");
        device.receiveMessage(msg);

        int finalBattery = device.getBattery().getRemainingBattery();
        assertEquals(40, finalBattery);

        device.rechargeBattery();
    }

    @Test
    void updateConsumptionTest() {
        device.update();

        int finalBattery = device.getBattery().getRemainingBattery();
        assertEquals(38, finalBattery);

        device.rechargeBattery();
    }

    @Test
    void spendBatteryTest() {
        Battery battery = device.getBattery();

        battery.spendBattery(20);
        assertEquals(30, battery.getRemainingBattery());

        battery.spendBattery(30);
        assertEquals(0, battery.getRemainingBattery());

        battery.spendBattery(10);
        assertEquals(0, battery.getRemainingBattery());

        device.rechargeBattery();
    }

    @Test
    void screenOnTest() {
        device.turnScreenOn();

        assertTrue(device.getScreen().isOn());
        assertEquals("Screen{\nIs On: true\n}", device.getScreen().toString());

        device.update();
        int finalBattery = device.getBattery().getRemainingBattery();
        assertEquals(28, finalBattery);

        device.rechargeBattery();
        device.turnScreenOff();

        assertFalse(device.getScreen().isOn());

        device.update();
        finalBattery = device.getBattery().getRemainingBattery();
        assertEquals(38, finalBattery);

        device.rechargeBattery();
    }
}
