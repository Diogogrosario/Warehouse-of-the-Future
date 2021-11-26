package devices;

import components.Battery;
import components.Light;
import config.Config;

import java.util.ArrayList;
import java.util.List;

public class DeviceFactory {

    public static Device deviceFromConfig(Config c, int id, Position pos, MeshGrid meshGrid) {
        int receivingConsumption = c.receivingConsumption;
        int sendingConsumption = c.sendingConsumption;

        Battery battery = new Battery(c.totalBattery, c.batIdleConsumption);
        List<Light> lights = new ArrayList<>();
        lights.add(new Light(c.lightIdleConsumption, c.lightOnConsumption));

        return new Device(id, pos, meshGrid, receivingConsumption, sendingConsumption, battery, lights);
    }

    public static Device deviceFromConfig(int id, Position pos, MeshGrid meshGrid) {

        Config c = Config.getInstance();

        return DeviceFactory.deviceFromConfig(c, id, pos, meshGrid);

    }
}
