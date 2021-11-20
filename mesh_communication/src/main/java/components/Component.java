package components;

public abstract class Component {
    protected final int idleConsumption;

    public Component(int idleConsumption) {
        this.idleConsumption = idleConsumption;
    }

    public int getTickComsumption() {
        return this.idleConsumption;
    }

    abstract void update();
}
