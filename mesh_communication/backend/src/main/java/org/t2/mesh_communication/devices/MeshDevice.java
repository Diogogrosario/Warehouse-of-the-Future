package org.t2.mesh_communication.devices;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import org.t2.mesh_communication.devices.comm_strat.CommunicationStrategy;
import org.t2.mesh_communication.devices.command.Command;
import org.t2.mesh_communication.devices.messages.Message;
import org.t2.mesh_communication.devices.messages.RequestMessage;

/** A device on a mesh Network. Can be an orchestrator or a normal, passive device. */
public abstract class MeshDevice implements Updatable {
    protected final int id;
    protected final Position pos;
    protected final float range;

    /** The set of commands that will be run in the current tick. */
    protected final List<Command> commands;
    /** The set of commands for the next tick. */
    protected final List<Command> commandsNext;

    /** The communication strategy employed by the device (receive and send messages). */
    private final CommunicationStrategy commStrat;

    /** The sequence number that will be sent on the next message's header (from this device). */
    private int seqNum;

    public MeshDevice(int id, Position pos, float range, CommunicationStrategy commStrat) {
        this.id = id;
        this.pos = pos;
        this.range = range;
        this.commStrat = commStrat;

        this.seqNum = 0;
        this.commands = new ArrayList<>();
        this.commandsNext = new ArrayList<>();
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

    public int getSeqNum() {
        return seqNum;
    }

    public List<Command> getCommands() {
        return commands;
    }

    public List<Command> getCommandsNext() {
        return commandsNext;
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

        this.commands.clear();
        this.commands.addAll(this.commandsNext);
        this.commandsNext.clear();
        this.commStrat.reset();

        return hadUpdates;
    }

    /**
     * Adds an action to be run on the next tick.
     *
     * @param c Action to run
     */
    public void addCommand(Command c) {
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

    public List<Integer> getDeadNeighbors() {
        return this.commStrat.getDeadNeighbors();
    }

    public HashMap<Integer, Integer> getNeighborTTLs() {
        return this.commStrat.getNeighborTTLs();
    }

    protected abstract void logSendMessage(Message msg);

    public List<Integer> sendMessage(Message msg) {
        this.logSendMessage(msg);
        return this.commStrat.sendMessage(this, msg);
    }

    protected abstract void logReceiveMessage(Message msg);

    public boolean receiveMessage(Message msg) {
        this.logReceiveMessage(msg);
        return this.commStrat.receiveMessage(this, msg);
    }

    public List<Command> getNextCommands() {
        return this.commandsNext;
    }

    public String toJson() {
        return "{\"device_id\":"
                + this.id
                + ",\"position\":{\"x\":"
                + this.pos.getX()
                + ",\"y\":"
                + this.pos.getY()
                + "},\"orchestrator\":"
                + (this.id == MeshGrid.ORCHESTRATOR_ID)
                + "}";
    }
}
