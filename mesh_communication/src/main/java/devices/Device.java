package devices;

import components.Battery;
import components.Light;
import config.Config;
import devices.command.SendMsgCmd;

import java.util.ArrayList;
import java.util.List;

public class Device extends MeshDevice {
    private final int receivingConsumption;
    private final int sendingConsumption;
    private final Battery battery;
    private final List<Light> lights;

    public Device(int id, Position pos, MeshGrid meshGrid) {
        // TODO don't hard code range
        super(id, pos, 1, meshGrid);

        Config c = Config.getInstance();
        this.receivingConsumption = c.receivingConsumption;
        this.sendingConsumption = c.sendingConsumption;

        this.battery = new Battery(c.totalBattery, c.batIdleConsumption);
        this.lights = new ArrayList<>();
        this.lights.add(new Light(c.lightIdleConsumption, c.lightOnConsumption));
    }

    @Override
    public void sendMessage(Message msg) {
        System.out.printf("Device sent message: [id=%d], [msg=%s]\n", this.id, msg.getContent());
        super.sendMessage(msg);
    }

    @Override
    public boolean receiveMessage(Message msg) {
        // have we seen this before => drop it
        if (msg.isInPath(this.id)) return true;
        // are we the destination
        if (msg.getDestination() == this.id) {
            System.out.printf("Message reached destination: [id=%d], [msg=%s]\n", this.id, msg);
            return true;
        }

        System.out.printf("Device is relaying message: [id=%d], [msg=%s]\n", this.id, msg);
        this.addCommand(new SendMsgCmd(this, msg));

        return true;
    }
}
