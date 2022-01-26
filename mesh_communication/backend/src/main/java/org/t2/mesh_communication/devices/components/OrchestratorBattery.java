package org.t2.mesh_communication.devices.components;

public class OrchestratorBattery extends Battery {

    public OrchestratorBattery() {
        super(1, 0);
    }

    @Override
    public void spendBattery(int batToSpend) {
        return;
    }
}
