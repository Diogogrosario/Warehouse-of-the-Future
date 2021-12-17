package org.t2.mesh_communication.devices;

import org.t2.mesh_communication.devices.comm_strat.CommunicationStrategy;
import org.t2.mesh_communication.devices.messages.Message;

/** The device responsible for initiating communications on the mesh network. */
public class Orchestrator extends MeshDevice {
    public Orchestrator(Position pos, CommunicationStrategy commStrat) {
        // TODO don't hard code range
        super(MeshGrid.ORCHESTRATOR_ID, pos, 1, commStrat);
    }

    @Override
    public void sendMessage(Message msg) {
        System.out.printf(
                "Orchestrator sent message: [destination=%d], [msg=%s]\n",
                msg.getDestination(), msg.getContent());
        super.sendMessage(msg);
    }

    @Override
    public boolean receiveMessage(Message msg) {
        return true;
    }
}
