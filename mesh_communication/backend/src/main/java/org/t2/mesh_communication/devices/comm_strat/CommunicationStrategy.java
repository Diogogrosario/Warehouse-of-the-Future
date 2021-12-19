package org.t2.mesh_communication.devices.comm_strat;

import java.util.HashMap;
import java.util.List;
import org.t2.mesh_communication.devices.MeshDevice;
import org.t2.mesh_communication.devices.messages.Message;

public interface CommunicationStrategy {
    void reset();

    /** Returns the TTLs of known neighbors. */
    HashMap<Integer, Integer> getNeighborTTLs();

    /** Returns all detected dead neighbors. */
    List<Integer> getDeadNeighbors();

    /**
     * Given a device that wants to send a message, yields all device that will recieve that message
     *
     * @param me The device relaying/sending the message.
     * @return the list of devices that me will send messages to
     */
    public List<MeshDevice> getDestsOfDevice(MeshDevice me);

    /**
     * Sends a message. This device can be the source of the message or just relaying it. Don't send
     * a message to yourself. It isn't intended.
     *
     * @param me The device relaying/sending the message.
     * @param msg The message to send (or relay).
     * @return the list of devices id's that the message was sent t
     */
    void sendMessage(MeshDevice me, Message msg);

    /**
     * Handles an incoming message.
     *
     * @param me The device receiving the message.
     * @param msg The incoming message.
     * @return true, if success; false, otherwise.
     */
    boolean receiveMessage(MeshDevice me, Message msg);
}
