package org.t2.mesh_communication;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.t2.mesh_communication.devices.components.Battery;
import org.t2.mesh_communication.devices.components.BatteryObserver;

public class BatteryObserverTests {
    private static BatteryObserver batteryObserver;

    @BeforeAll
    static void init() {
        batteryObserver = BatteryObserver.getInstance();
    }

    @Test
    void oneBatteryTest() {
        Battery battery = new Battery(10, 2);
        batteryObserver.reset();
        assertEquals(0, batteryObserver.getTotalTickConsumption());

        int batteryToSpend = 5;
        battery.spendBattery(batteryToSpend);
        assertEquals(5, batteryObserver.getTotalTickConsumption());

        batteryObserver.reset();
        batteryToSpend = 6; // spend more remaining battery
        battery.spendBattery(batteryToSpend);
        assertEquals(5, batteryObserver.getTotalTickConsumption());
    }

    @Test
    void manyBatteriesTest() {
        Battery b1 = new Battery(10, 1);
        Battery b2 = new Battery(10, 1);
        Battery b3 = new Battery(10, 1);
        Battery b4 = new Battery(10, 1);
        batteryObserver.reset();

        b1.spendBattery(23);
        b2.spendBattery(3);
        b3.spendBattery(4);
        b4.spendBattery(5);

        int expected = 10 + 3 + 4 + 5;
        assertEquals(expected, batteryObserver.getTotalTickConsumption());
    }
}
