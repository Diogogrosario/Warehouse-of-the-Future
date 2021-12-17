package org.t2.mesh_communication.devices.components;

public abstract class Component {
    protected final int idleConsumption;

    public Component(int idleConsumption) {
        this.idleConsumption = idleConsumption;
    }

    public int getTickConsumption() {
        return this.idleConsumption;
    }
}
