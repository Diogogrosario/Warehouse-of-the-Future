package org.t2.mesh_communication.devices;

import java.util.*;

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

    // near devices time to live
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
            int deviceId = d.getId();

            // reduce TTL only if it hasn't done it already in this tick and if the message to be sent
            // didnt go through the device before (the device will not relay it)
            if (devicesLife.containsKey(deviceId) && !currentSending.contains(deviceId)) {
                if (!msg.getPath().contains(deviceId) && msg.getDestination() != deviceId) {
                    Integer newTTL = Integer.max(devicesLife.get(deviceId) - 1, 0);
                    devicesLife.put(deviceId, newTTL);
                    currentSending.add(deviceId);
                }
            }

            this.addCommand(new ReceiveMsgCmd(d, msg));
        }
    }

    public abstract boolean receiveMessage(Message msg);

    protected void resetTimeToLive(int id) {
        this.devicesLife.put(id, DEFAULT_TTL);
    }

    protected void checkDevicesLife() {
        for (Map.Entry<Integer, Integer> entry : devicesLife.entrySet()) {
            if (entry.getValue() < 0) {
                System.out.println(this.id + ": Device " + entry.getKey() + " is kill!");
            }
        }
    }

    public Map<Integer, Integer> getDevicesLife() {
        return this.devicesLife;
    }
}
