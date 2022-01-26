package org.t2.mesh_communication.devices.comm_strat;

import java.io.Serializable;
import java.util.*;
import org.t2.mesh_communication.devices.MeshDevice;
import org.t2.mesh_communication.devices.MeshGrid;
import org.t2.mesh_communication.devices.command.Command;
import org.t2.mesh_communication.devices.command.ReceiveMsgCmd;
import org.t2.mesh_communication.devices.command.SendMsgCmd;
import org.t2.mesh_communication.devices.messages.Message;
import org.t2.mesh_communication.devices.messages.RequestMessage;
import org.t2.mesh_communication.log.Log;
import org.t2.mesh_communication.log.Logger;

public class FloodStrategy implements CommunicationStrategy, Serializable {
    public static final int DEFAULT_TTL = 6;
    public static final int DEFAULT_MSG_FAIL = 0;

    /**
     * Neighbor table, including TTLs. Each neighbor device is registered in this table with a
     * time-to-live counting down the missed (but expected) messages from them. If it reaches 0, the
     * device is believed to be dead.
     */
    private final HashMap<Integer, Integer> neighborTTL;

    private int ttl;
    /** Neighbors that were messaged on the current tick. */
    private final Set<Integer> currentSending;
    /** The last sequence number seen from each source. */
    private final Map<Integer, Integer> seqMap;

    private final MeshGrid meshGrid;

    private final int messageFailure;

    public FloodStrategy(MeshGrid meshGrid, int ttl, int messageFailure) {
        this.meshGrid = meshGrid;
        this.ttl = ttl;
        this.messageFailure = messageFailure;

        this.neighborTTL = new HashMap<>();
        this.currentSending = new HashSet<>();
        this.seqMap = new HashMap<>();
    }

    public FloodStrategy(MeshGrid meshGrid) {
        this(meshGrid, DEFAULT_TTL, DEFAULT_MSG_FAIL);
    }

    @Override
    public void reset() {
        this.currentSending.clear();
    }

    @Override
    public HashMap<Integer, Integer> getNeighborTTLs() {
        return this.neighborTTL;
    }

    @Override
    public List<Integer> getDeadNeighbors() {
        List<Integer> ret = new ArrayList<>();

        for (Map.Entry<Integer, Integer> entry : neighborTTL.entrySet()) {
            if (entry.getValue() <= 0) {
                ret.add(entry.getKey());
                // System.out.println(this.id + ": Device " + entry.getKey() + " is kill!");
                // TODO deal with the knowledge that a neighbor is dead
            }
        }

        return ret;
    }

    @Override
    public List<MeshDevice> getDestsOfDevice(MeshDevice me) {
        return this.meshGrid.devicesInRange(me);
    }

    @Override
    public void sendMessage(MeshDevice me, Message msg) {
        msg.addPath(me.getId());

        for (MeshDevice d : this.getDestsOfDevice(me)) {
            int deviceId = d.getId();

            // reduce TTL only if it hasn't done it already in this tick and if the message
            // to be sent didn't go through the device before (the device will not relay it)
            if (this.neighborTTL.containsKey(deviceId) && !this.currentSending.contains(deviceId)) {
                if (!msg.getPath().contains(deviceId)) {
                    Integer newTTL = Integer.max(this.neighborTTL.get(deviceId) - 1, 0);
                    this.neighborTTL.put(deviceId, newTTL);
                    this.currentSending.add(deviceId);
                }
            }

            d.addCommand(new ReceiveMsgCmd(d, msg, this.messageFailure));
        }
    }

    protected void resetTimeToLive(int id) {
        if (id != this.meshGrid.getOrchestratorId()) this.neighborTTL.put(id, this.ttl);
    }

    private boolean seenMessage(MeshDevice me, Message msg) {
        // we relayed this before => drop it
        if (msg.isInPath(me.getId())) return true;

        // if we haven't relayed this one but a copy => drop it
        int s = msg.getSource();
        return this.seqMap.containsKey(s) && this.seqMap.get(s) >= msg.getSeq();
    }

    @Override
    public boolean receiveMessage(MeshDevice me, Message msg) {
        this.resetTimeToLive(msg.getLastHop());

        // already seen => drop
        if (this.seenMessage(me, msg)) return true;
        this.seqMap.put(msg.getSource(), msg.getSeq());

        // are we the destination
        if (msg.getDestination() == me.getId()) {
            Logger.getInstance()
                    .publish(
                            new Log(
                                    "Device " + me.getId(),
                                    "Reached destination: [source=%d], [msg=%s]",
                                    msg.getSource(),
                                    msg));

            // check message type
            String msgType = msg.getType();

            if (RequestMessage.type.equals(msgType)) {
                // send reply to request msg
                Message rep = me.createReply(msg.getSource(), "Reply.");
                Logger.getInstance()
                        .publish(
                                new Log(
                                        "Device " + me.getId(),
                                        "Replying: [destination=%d], [msg=%s]",
                                        rep.getDestination(),
                                        rep.getContent()));
                me.addCommand(new SendMsgCmd(me, rep));
            }

            return true;
        }

        Logger.getInstance()
                .publish(
                        new Log(
                                "Device " + me.getId(),
                                "Relaying message: [destination=%d], [msg=%s]",
                                msg.getDestination(),
                                msg.getContent()));
        me.addCommand(new SendMsgCmd(me, msg));

        return true;
    }

    @Override
    public int getNFailedMessages(MeshDevice me) {
        int failed = 0;
        for (Command command : me.getCommands()) {
            if (command instanceof ReceiveMsgCmd) {
                if (((ReceiveMsgCmd) command).isFailed()) failed++;
            }
        }
        return failed;
    }
}
