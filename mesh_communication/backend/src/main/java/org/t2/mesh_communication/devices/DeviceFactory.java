package org.t2.mesh_communication.devices;

import org.t2.mesh_communication.config.Config;
import org.t2.mesh_communication.devices.comm_strat.CommunicationStrategy;
import org.t2.mesh_communication.devices.components.Battery;
import org.t2.mesh_communication.devices.components.Screen;

/** Instantiate devices from a configuration file. */
public class DeviceFactory {
    public static Device deviceFromConfig(
            Config c, int id, Position pos, CommunicationStrategy commStrat) {
        int receivingConsumption = c.receivingConsumption;
        int sendingConsumption = c.sendingConsumption;

        Battery battery = new Battery(c.totalBattery, c.batIdleConsumption);
        Screen screen = new Screen(c.screenIdleConsumption, c.screenOnConsumption);

        return new Device(
                id, pos, commStrat, receivingConsumption, sendingConsumption, battery, screen);
    }

    public static Device deviceFromConfig(int id, Position pos, CommunicationStrategy commStrat) {

        Config c = Config.getInstance();

        return DeviceFactory.deviceFromConfig(c, id, pos, commStrat);
    }
}
