package devices;

public abstract class MeshDevice {
    protected final int id;
    protected final Position pos;
    protected final float range;
    protected final MeshGrid meshGrid;

    public MeshDevice(int id, Position pos, float range, MeshGrid meshGrid) {
        this.id = id;
        this.pos = pos;
        this.range = range;
        this.meshGrid = meshGrid;
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

    public abstract void sendMessage(Message msg);

    public abstract boolean receiveMessage(Message msg);
}
