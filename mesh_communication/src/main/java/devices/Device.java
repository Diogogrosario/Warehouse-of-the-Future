package devices;

import components.Battery;
import components.Light;
import config.Config;

import java.util.ArrayList;
import java.util.List;

public class Device {
    private final int receivingConsumption;
    private final int sendingConsumption;

    private final Battery battery;
    private final List<Light> lights;

    public Device() {
        Config c = Config.getInstance();

        this.receivingConsumption = c.receivingConsumption;
        this.sendingConsumption = c.sendingConsumption;

        this.battery = new Battery(c.totalBattery, c.batIdleConsumption);
        this.lights = new ArrayList<>();
        //this.lights.add(new Light(0, c.))
    }

    public void addLight(Light l) {
        this.lights.add(l);
    }

    public void addLights(List<Light> ls) {
        this.lights.addAll(ls);
    }
}
