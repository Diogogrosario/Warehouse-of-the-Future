package org.t2.mesh_communication.devices;

import org.t2.mesh_communication.devices.comm_strat.CommunicationStrategy;
import org.t2.mesh_communication.devices.components.Battery;
import org.t2.mesh_communication.devices.components.Screen;
import org.t2.mesh_communication.devices.messages.Message;

/** The common device on the mesh network. */
public class Device extends MeshDevice {
    private final int receivingConsumption;
    private final int sendingConsumption;
    private final Battery battery;
    private final Screen screen;

    public Device(
            int id,
            Position pos,
            CommunicationStrategy commStrat,
            int receivingConsumption,
            int sendingConsumption,
            Battery battery,
            Screen screen) {
        // TODO don't hard code range
        super(id, pos, 1, commStrat);

        this.receivingConsumption = receivingConsumption;
        this.sendingConsumption = sendingConsumption;
        this.battery = battery;
        this.screen = screen;
    }

    @Override
    public void sendMessage(Message msg) {
        System.out.printf("Device sent message: [id=%d], [msg=%s]\n", this.id, msg.getContent());
        // decrease battery life
        this.battery.spendBattery(this.sendingConsumption);
        super.sendMessage(msg);
    }

    @Override
    public boolean receiveMessage(Message msg) {
        System.out.printf(
                "Device received message: [id=%d], [msg=%s], [lastHop=%d]\n",
                this.id, msg, msg.getLastHop());
        // decrease battery life
        this.battery.spendBattery(this.receivingConsumption);
        return super.receiveMessage(msg);
    }

    @Override
    public boolean update() {
        // update only if device has battery
        if (battery.getRemainingBattery() > 0) {
            boolean hadUpdates = super.update();

            // get components battery usage
            int batUsage = battery.getTickConsumption() + screen.getTickConsumption();

            battery.spendBattery(batUsage);
            return hadUpdates;
        }
        return false;
    }

    public void turnScreenOn() {
        this.screen.setOn(true);
    }

    public void turnScreenOff() {
        this.screen.setOn(false);
    }

    public void rechargeBattery() {
        this.battery.batteryRecharge();
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

    public Screen getScreen() {
        return screen;
    }
}
