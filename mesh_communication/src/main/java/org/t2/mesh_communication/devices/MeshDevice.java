package org.t2.mesh_communication.devices;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.t2.mesh_communication.devices.command.Command;
import org.t2.mesh_communication.devices.command.ReceiveMsgCmd;

public abstract class MeshDevice implements Updatable {
    protected final int id;
    protected final Position pos;
    protected final float range;
    protected final MeshGrid meshGrid;

    protected int seqNum;
    // the set of commands that will be run in the current tick
    protected final List<Command> commands;
    // the set of commands for the next tick
    protected final List<Command> commandsNext;
    // the last sequence number seen for each source
    protected final Map<Integer, Integer> seqMap;

    public MeshDevice(int id, Position pos, float range, MeshGrid meshGrid) {
        this.id = id;
        this.pos = pos;
        this.range = range;
        this.meshGrid = meshGrid;

        this.seqNum = 0;
        this.commands = new ArrayList<>();
        this.commandsNext = new ArrayList<>();
        this.seqMap = new HashMap<>();
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

    @Override
    public boolean update() {
        boolean hadUpdates = (this.commands.size() != 0);

        for (Command c : this.commands) {
            c.execute();
        }
        this.commands.clear();
        this.commands.addAll(this.commandsNext);
        this.commandsNext.clear();

        return hadUpdates;
    }

    protected void addCommand(Command c) {
        this.commandsNext.add(c);
    }

    public Message createMessage(int dest, String content) {
        ++this.seqNum;
        return new Message(this.id, this.seqNum, dest, content);
    }

    public void sendMessage(Message msg) {
        msg.addPath(this.id);
        for (MeshDevice d : this.meshGrid.devicesInRange(this)) {
            this.addCommand(new ReceiveMsgCmd(d, msg));
        }
    }

    public abstract boolean receiveMessage(Message msg);
}
