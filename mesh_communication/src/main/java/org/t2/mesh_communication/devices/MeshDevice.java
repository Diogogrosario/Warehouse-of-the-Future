package org.t2.mesh_communication.devices;

import java.util.*;
import org.t2.mesh_communication.devices.command.Command;
import org.t2.mesh_communication.devices.command.ReceiveMsgCmd;
import org.t2.mesh_communication.devices.messages.Message;
import org.t2.mesh_communication.devices.messages.RequestMessage;

/** A device on a mesh Network. Can be an orchestrator or a normal, passive device. */
public abstract class MeshDevice implements Updatable {
    protected final int id;
    protected final Position pos;
    protected final float range;
    protected final MeshGrid meshGrid;

    /** The sequence number that will be sent on the next message's header (from this device). */
    protected int seqNum;
    /** The set of commands that will be run in the current tick. */
    protected final List<Command> commands;
    /** The set of commands for the next tick. */
    protected final List<Command> commandsNext;
    /** The last sequence number seen from each source. */
    protected final Map<Integer, Integer> seqMap;

    /**
     * Neighbor table, including TTLs. Each neighbor device is registered in this table with a
     * time-to-live counting down the missed (but expected) messages from them. If it reaches 0, the
     * device is believed to be dead.
     */
    private final HashMap<Integer, Integer> devicesLife;

    private final Set<Integer> currentSending;
    private final int DEFAULT_TTL = 6;

    public MeshDevice(int id, Position pos, float range, MeshGrid meshGrid) {
        this.id = id;
        this.pos = pos;
        this.range = range;
        this.meshGrid = meshGrid;

        this.seqNum = 0;
        this.commands = new ArrayList<>();
        this.commandsNext = new ArrayList<>();
        this.seqMap = new HashMap<>();

        this.devicesLife = new HashMap<>();
        this.currentSending = new HashSet<>();
    }

    public int getId() {
        return this.id;
    }

    public Position getPos() {
        return this.pos;
    }

    public float getRange() {
        return this.range;
    }

    /**
     * Runs the scheduled commands for this tick (for this device). This includes checking for the
     * neighboring devices' death, sending messages, and receiving messages.
     *
     * @return True, if any update was run. False, otherwise.
     */
    @Override
    public boolean update() {
        boolean hadUpdates = (this.commands.size() != 0);

        for (Command c : this.commands) {
            c.execute();
        }

        this.checkDevicesLife();

        this.commands.clear();
        this.commands.addAll(this.commandsNext);
        this.commandsNext.clear();
        this.currentSending.clear();

        return hadUpdates;
    }

    /**
     * Adds an action to be run on the next tick.
     *
     * @param c Action to run
     */
    protected void addCommand(Command c) {
        this.commandsNext.add(c);
    }

    /**
     * Creates a message originating from this device.
     *
     * @param dest Destination of the message.
     * @param content Content of the message.
     * @return The generated message object.
     */
    public Message createMessage(int dest, String content) {
        ++this.seqNum;
        return new RequestMessage(this.id, this.seqNum, dest, content);
    }

    /**
     * Sends a message. This device can be the source of the message or just relaying it.
     *
     * @param msg The message to send (or relay).
     */
    public void sendMessage(Message msg) {
        msg.addPath(this.id);
        for (MeshDevice d : this.meshGrid.devicesInRange(this)) {
            int deviceId = d.getId();

            // reduce TTL only if it hasn't done it already in this tick and if the message to be
            // sent
            // didnt go through the device before (the device will not relay it)
            if (devicesLife.containsKey(deviceId) && !currentSending.contains(deviceId)) {
                if (!msg.getPath().contains(deviceId) && msg.getDestination() != deviceId) {
                    Integer newTTL = Integer.max(devicesLife.get(deviceId) - 1, 0);
                    devicesLife.put(deviceId, newTTL);
                    currentSending.add(deviceId);
                }
            }

            d.addCommand(new ReceiveMsgCmd(d, msg));
        }
    }

    public abstract boolean receiveMessage(Message msg);

    protected void resetTimeToLive(int id) {
        this.devicesLife.put(id, DEFAULT_TTL);
    }

    /** Looks for any dead neighbors, and takes the necessary actions to handle the situation. */
    protected void checkDevicesLife() {
        for (Map.Entry<Integer, Integer> entry : devicesLife.entrySet()) {
            if (entry.getValue() < 0) {
                System.out.println(this.id + ": Device " + entry.getKey() + " is kill!");
                // TODO deal with the knowledge that a neighbor is dead
            }
        }
    }

    public Map<Integer, Integer> getDevicesLife() {
        return this.devicesLife;
    }

    public List<Command> getNextCommands() {
        return this.commandsNext;
    }
}
