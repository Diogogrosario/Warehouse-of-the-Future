package devices;

import devices.command.Command;

import java.util.ArrayList;
import java.util.List;

public abstract class MeshDevice {
    protected final int id;
    protected final Position pos;
    protected final float range;
    protected final MeshGrid meshGrid;
    // the set of commands that will be run in the current tick
    protected final List<Command> commands;
    // the set of commands for the next tick
    protected final List<Command> commandsNext;

    public MeshDevice(int id, Position pos, float range, MeshGrid meshGrid) {
        this.id = id;
        this.pos = pos;
        this.range = range;
        this.meshGrid = meshGrid;
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

    public void update() {
        for (Command c : this.commands) {
            c.execute();
        }
        this.commands.clear();
        this.commands.addAll(this.commandsNext);
        this.commandsNext.clear();
    }

    protected void addCommand(Command c) {
        this.commandsNext.add(c);
    }

    public void sendMessage(Message msg) {
        msg.addPath(this.id);
        for (MeshDevice d : this.meshGrid.devicesInRange(this)) {
            d.receiveMessage(msg);
        }
    }

    public abstract boolean receiveMessage(Message msg);
}
