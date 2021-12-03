package org.t2.mesh_communication.devices;

import org.t2.mesh_communication.config.Config;
import org.t2.mesh_communication.devices.components.Battery;
import org.t2.mesh_communication.devices.components.Screen;

public class DeviceFactory {

    public static Device deviceFromConfig(Config c, int id, Position pos, MeshGrid meshGrid) {
        int receivingConsumption = c.receivingConsumption;
        int sendingConsumption = c.sendingConsumption;

        Battery battery = new Battery(c.totalBattery, c.batIdleConsumption);
        Screen screen = new Screen(c.screenIdleConsumption, c.screenOnConsumption);

        return new Device(
                id, pos, meshGrid, receivingConsumption, sendingConsumption, battery, screen);
    }

    public static Device deviceFromConfig(int id, Position pos, MeshGrid meshGrid) {

        Config c = Config.getInstance();

        return DeviceFactory.deviceFromConfig(c, id, pos, meshGrid);
    }
}
