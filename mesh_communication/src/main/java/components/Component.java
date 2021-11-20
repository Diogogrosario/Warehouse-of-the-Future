package components;

public abstract class Component {
    protected final int idleConsumption;

    public Component(int idleConsumption) {
        this.idleConsumption = idleConsumption;
    }

    public Component() {
        this(0);
    }

    abstract void update();

    abstract void sentMessage();

    abstract void receivedMessage();

    public int getTickComsumption() {
        return this.idleConsumption;
    }
}
