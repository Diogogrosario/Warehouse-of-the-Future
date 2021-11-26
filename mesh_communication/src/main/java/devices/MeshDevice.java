package devices;

import devices.command.Command;
import devices.command.ReceiveMsgCmd;
import devices.command.SendMsgCmd;

import java.util.*;

public abstract class MeshDevice {
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
    private final int DEFAULT_TTL = 3;

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

    public boolean update() {
        boolean hadUpdates = (this.commands.size() != 0);

        for (Command c : this.commands) {
            c.execute();
        }

        this.checkDevicesLife();

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
            if (!devicesLife.containsKey(d.getId())) {
                devicesLife.put(d.getId(), DEFAULT_TTL);
            } else {
                devicesLife.put(d.getId(), devicesLife.get(d.getId()) - 1);
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
            if (entry.getValue() == 0) {
                System.out.println("Device " + entry.getKey() + " is kill!");
                // send message to orchestrator to warn about dead device
                this.sendMessage(new Message(this.id, this.seqNum, 0, "Device " + entry.getKey() + " is kill!"));
            }
        }
    }
}
