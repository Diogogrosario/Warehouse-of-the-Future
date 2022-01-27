package org.t2.mesh_communication.devices.components;

import java.io.Serializable;

public abstract class Component implements Serializable {
    protected final int idleConsumption;

    public Component(int idleConsumption) {
        this.idleConsumption = idleConsumption;
    }

    public int getTickConsumption() {
        return this.idleConsumption;
    }
}
