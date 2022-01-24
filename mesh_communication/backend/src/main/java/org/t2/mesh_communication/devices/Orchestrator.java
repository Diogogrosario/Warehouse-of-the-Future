package org.t2.mesh_communication.devices;

import java.util.List;
import org.t2.mesh_communication.config.Product;
import org.t2.mesh_communication.devices.comm_strat.CommunicationStrategy;
import org.t2.mesh_communication.devices.command.SendMsgCmd;
import org.t2.mesh_communication.devices.components.OrchestratorBattery;
import org.t2.mesh_communication.devices.messages.Message;
import org.t2.mesh_communication.log.Log;
import org.t2.mesh_communication.log.Logger;

/** The device responsible for initiating communications on the mesh network. */
public class Orchestrator extends MeshDevice {
    public Orchestrator(
            int orchestratorId, Position pos, int range, CommunicationStrategy commStrat) {
        super(orchestratorId, pos, range, commStrat, new OrchestratorBattery());
    }

    public void orchestrate(List<Product> products) {
        for (Product prod : products) {
            Message msg = createMessage(prod.getId(), "Quantity: " + prod.getQuantity());
            this.commands.add(new SendMsgCmd(this, msg));
        }
    }

    @Override
    protected void logSendMessage(Message msg) {
        Logger.getInstance()
                .publish(
                        new Log(
                                "Orchestrator",
                                "Sent message: [destination=%d], [msg=%s]",
                                msg.getDestination(),
                                msg.getContent()));
    }

    @Override
    public void sendMessage(Message msg) {
        super.sendMessage(msg);
    }

    @Override
    protected void logReceiveMessage(Message msg) {
        Logger.getInstance()
                .publish(
                        new Log(
                                "Orchestrator",
                                "Received message: [source=%d], [msg=%s], [lastHop=%d]",
                                msg.getSource(),
                                msg.getContent(),
                                msg.getLastHop()));
    }

    @Override
    public boolean receiveMessage(Message msg) {
        return true;
    }

    @Override
    public String toJson() {
        return "{\"id\":"
                + this.id
                + ",\"position\":"
                + this.pos.toJson()
                + ",\"orchestrator\": true"
                + "}";
    }

    @Override
    public boolean isOperational() {
        return true;
    }
}
