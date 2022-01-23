package org.t2.mesh_communication.devices;

import org.t2.mesh_communication.devices.comm_strat.CommunicationStrategy;
import org.t2.mesh_communication.devices.components.Battery;
import org.t2.mesh_communication.devices.components.Screen;
import org.t2.mesh_communication.devices.messages.Message;
import org.t2.mesh_communication.log.Log;
import org.t2.mesh_communication.log.Logger;

/** The common device on the mesh network. */
public class Device extends MeshDevice {
    private final int receivingConsumption;
    private final int sendingConsumption;
    private final Screen screen;

    public Device(
            int id,
            Position pos,
            CommunicationStrategy commStrat,
            int receivingConsumption,
            int sendingConsumption,
            int range,
            Battery battery,
            Screen screen) {
        super(id, pos, range, commStrat, battery);

        this.receivingConsumption = receivingConsumption;
        this.sendingConsumption = sendingConsumption;
        this.screen = screen;
    }

    @Override
    protected void logSendMessage(Message msg) {
        Logger.getInstance()
                .publish(
                        new Log(
                                "Device " + this.id,
                                "Sent message: [destination=%d], [msg=%s]",
                                msg.getDestination(),
                                msg.getContent()));
    }

    @Override
    public void sendMessage(Message msg) {
        // decrease battery life
        this.battery.spendBattery(this.sendingConsumption);
        super.sendMessage(msg);
    }

    @Override
    protected void logReceiveMessage(Message msg) {
        Logger.getInstance()
                .publish(
                        new Log(
                                "Device " + this.id,
                                "Received message: [source=%d], [msg=%s], [lastHop=%d]",
                                msg.getSource(),
                                msg.getContent(),
                                msg.getLastHop()));
    }

    @Override
    public boolean receiveMessage(Message msg) {
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

    public Screen getScreen() {
        return screen;
    }

    public int getSendingConsumption() {
        return sendingConsumption;
    }

    @Override
    public String toJson() {
        return "{\"id\":"
                + this.id
                + ",\"battery_max\":"
                + this.battery.getTotalBattery()
                + ",\"battery_level\":"
                + this.battery.getRemainingBattery()
                + ",\"position\":"
                + this.pos.toJson()
                + "}";
    }

    @Override
    public boolean isOperational() {
        return this.battery.getRemainingBattery() > 0;
    }
}
