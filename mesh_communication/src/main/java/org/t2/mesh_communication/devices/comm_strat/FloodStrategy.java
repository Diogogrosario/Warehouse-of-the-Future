package org.t2.mesh_communication.devices.comm_strat;

import org.t2.mesh_communication.devices.MeshDevice;
import org.t2.mesh_communication.devices.MeshGrid;
import org.t2.mesh_communication.devices.command.ReceiveMsgCmd;
import org.t2.mesh_communication.devices.command.SendMsgCmd;
import org.t2.mesh_communication.devices.messages.Message;
import org.t2.mesh_communication.devices.messages.ReplyMessage;
import org.t2.mesh_communication.devices.messages.RequestMessage;

import java.util.*;

public class FloodStrategy implements CommunicationStrategy {
  public static final int DEFAULT_TTL = 6;

  /**
   * Neighbor table, including TTLs. Each neighbor device is registered in this table with a
   * time-to-live counting down the missed (but expected) messages from them. If it reaches 0, the
   * device is believed to be dead.
   */
  private final HashMap<Integer, Integer> neighborTTL;
  /** Neighbors that were messaged on the current tick. */
  private final Set<Integer> currentSending;
  /** The last sequence number seen from each source. */
  private final Map<Integer, Integer> seqMap;

  private final MeshGrid meshGrid;

  public FloodStrategy(MeshGrid meshGrid) {
    this.meshGrid = meshGrid;

    this.neighborTTL = new HashMap<>();
    this.currentSending = new HashSet<>();
    this.seqMap = new HashMap<>();
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
  public void sendMessage(MeshDevice me, Message msg) {
    msg.addPath(me.getId());

    for (MeshDevice d : this.meshGrid.devicesInRange(me)) {
      int deviceId = d.getId();

      // reduce TTL only if it hasn't done it already in this tick and if the message
      // to be sent didn't go through the device before (the device will not relay it)
      if (neighborTTL.containsKey(deviceId) && !currentSending.contains(deviceId)) {
        if (!msg.getPath().contains(deviceId)) {
          Integer newTTL = Integer.max(neighborTTL.get(deviceId) - 1, 0);
          neighborTTL.put(deviceId, newTTL);
          currentSending.add(deviceId);
        }
      }

      d.addCommand(new ReceiveMsgCmd(d, msg));
    }
  }

  protected void resetTimeToLive(int id) {
    this.neighborTTL.put(id, DEFAULT_TTL);
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
      System.out.printf("Message reached destination: [id=%d], [msg=%s]\n", me.getId(), msg);

      // check message type
      String msgType = msg.getType();

      if (RequestMessage.type.equals(msgType)) {
        // send reply to request msg
        ReplyMessage rep = new ReplyMessage(me.getId(), 0, msg.getSource(), "Reply.");
        System.out.printf("Device is replying: [id=%d], [msg=%s]\n", me.getId(), rep);
        me.addCommand(new SendMsgCmd(me, rep));
      }

      return true;
    }

    System.out.printf("Device is relaying message: [id=%d], [msg=%s]\n", me.getId(), msg);
    me.addCommand(new SendMsgCmd(me, msg));

    return true;
  }
}
