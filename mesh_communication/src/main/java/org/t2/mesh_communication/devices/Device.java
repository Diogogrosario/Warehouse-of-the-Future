package org.t2.mesh_communication.devices;

import java.util.List;
import org.t2.mesh_communication.devices.command.SendMsgCmd;
import org.t2.mesh_communication.devices.components.Battery;
import org.t2.mesh_communication.devices.components.Light;

public class Device extends MeshDevice {
    private final int receivingConsumption;
    private final int sendingConsumption;
    private final Battery battery;
    private final List<Light> lights;

    public Device(
            int id,
            Position pos,
            MeshGrid meshGrid,
            int receivingConsumption,
            int sendingConsumption,
            Battery battery,
            List<Light> lights) {
        // TODO don't hard code range
        super(id, pos, 1, meshGrid);

        this.receivingConsumption = receivingConsumption;
        this.sendingConsumption = sendingConsumption;
        this.battery = battery;
        this.lights = lights;
    }

    @Override
    public void sendMessage(Message msg) {
        System.out.printf("Device sent message: [id=%d], [msg=%s]\n", this.id, msg.getContent());
        super.sendMessage(msg);

        // decrease battery life
        this.battery.spendBattery(this.sendingConsumption);
    }

    private boolean seenMessage(Message msg) {
        // we relayed this before => drop it
        if (msg.isInPath(this.id)) return true;

        // if we haven't relayed this one but a copy => drop it
        int s = msg.getSource();

        return this.seqMap.containsKey(s) && this.seqMap.get(s) >= msg.getSeq();
    }

    @Override
    public boolean receiveMessage(Message msg) {
        this.resetTimeToLive(msg.getLastHop());
        // decrease battery life
        this.battery.spendBattery(this.receivingConsumption);

        // already seen => drop
        if (this.seenMessage(msg)) return true;
        this.seqMap.put(msg.getSource(), msg.getSeq());

        // are we the destination
        if (msg.getDestination() == this.id) {
            System.out.printf("Message reached destination: [id=%d], [msg=%s]\n", this.id, msg);
            return true;
        }

        System.out.printf("Device is relaying message: [id=%d], [msg=%s]\n", this.id, msg);
        this.addCommand(new SendMsgCmd(this, msg));

        return true;
    }

    @Override
    public boolean update() {
        // update only if device has battery
        if (battery.getRemainingBattery() > 0) {
            boolean hadUpdates = super.update();

            // get components battery usage
            int batUsage = battery.getTickConsumption();
            for (Light light : lights) {
                batUsage += light.getTickConsumption();
            }

            battery.spendBattery(batUsage);
            return hadUpdates;
        }
        return false;
    }

    public Battery getBattery() {
        return battery;
    }

    public int getSendingConsumption() {
        return sendingConsumption;
    }

    public int getReceivingConsumption() {
        return receivingConsumption;
    }

    public List<Light> getLights() {
        return lights;
    }
}
