package org.t2.mesh_communication.devices;

import org.t2.mesh_communication.config.Config;
import org.t2.mesh_communication.devices.comm_strat.FloodStrategy;
import org.t2.mesh_communication.devices.components.Battery;
import org.t2.mesh_communication.devices.components.Screen;

/** Instantiate devices from a configuration file. */
public class DeviceFactory {
    public static Device deviceFromConfig(Config c, int id, Position pos, MeshGrid grid) {
        int receivingConsumption = c.receivingConsumption;
        int sendingConsumption = c.sendingConsumption;

        int range = c.deviceRange;
        int ttl = c.timeToLive;
        int msgFail = c.messageFailure;

        Battery battery = new Battery(c.totalBattery, c.batIdleConsumption);
        Screen screen = new Screen(c.screenIdleConsumption, c.screenOnConsumption);

        FloodStrategy strat = new FloodStrategy(grid, ttl, msgFail);

        return new Device(
                id, pos, strat, receivingConsumption, sendingConsumption, range, battery, screen);
    }

    public static Device deviceFromConfig(int id, Position pos, MeshGrid grid) {

        Config c = Config.getInstance();

        return DeviceFactory.deviceFromConfig(c, id, pos, grid);
    }
}
