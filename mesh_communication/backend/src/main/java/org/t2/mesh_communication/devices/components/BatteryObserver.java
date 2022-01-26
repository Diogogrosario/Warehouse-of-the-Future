package org.t2.mesh_communication.devices.components;

import java.io.Serializable;

/**
 * Observes all devices present on the network. Stores battery consumption for one tick. Its count
 * needs to be reset upon the start of a new tick.
 */
public class BatteryObserver implements Serializable {
    private static BatteryObserver instance;
    private int totalTickConsumption;

    public BatteryObserver() {
        BatteryObserver.instance = this;
        this.totalTickConsumption = 0;
    }

    public static BatteryObserver getInstance() {
        if (BatteryObserver.instance == null) new BatteryObserver();
        return BatteryObserver.instance;
    }

    public void update(int consumption) {
        totalTickConsumption += consumption;
    }

    public void reset() {
        this.totalTickConsumption = 0;
    }

    public int getTotalTickConsumption() {
        return totalTickConsumption;
    }

    @Override
    public String toString() {
        return "Total tick consumption: " + totalTickConsumption + '\n';
    }
}
