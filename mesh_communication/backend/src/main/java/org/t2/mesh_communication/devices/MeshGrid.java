package org.t2.mesh_communication.devices;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Holder of the network devices. Represents the network and distributes the tick update commands to
 * all devices. Can be queried to find devices in a certain range.
 */
public class MeshGrid implements Serializable {
    private MeshDevice orchestrator;
    private List<MeshDevice> devices;
    private int nTicks;
    private int lastTickBat;
    private int nFailedMsg;

    private final int orchestratorId;

    public MeshGrid(int orchestratorId) {
        this.orchestratorId = orchestratorId;
        this.orchestrator = null;
        this.devices = new ArrayList<>();
        this.nTicks = 0;
        this.lastTickBat = 0;
        this.nFailedMsg = 0;
    }

    public int getCurrentBat() {
        int bat = 0;
        for (MeshDevice md : devices) {
            bat += md.getBattery().getRemainingBattery();
        }
        return bat;
    }

    public int getNTicks() {
        return nTicks;
    }

    public int getLastTickBat() {
        return lastTickBat;
    }

    public MeshDevice getOrchestrator() {
        return this.orchestrator;
    }

    public List<MeshDevice> getDevices() {
        return devices;
    }

    public void setDevices(List<MeshDevice> devices) {
        this.devices = devices;
    }

    public int getOrchestratorId() {
        return this.orchestratorId;
    }

    public void addDevice(MeshDevice d) {
        this.devices.add(d);
        if (d.getId() == this.orchestratorId) {
            assert this.orchestrator == null;
            this.orchestrator = d;
        }
    }

    public List<MeshDevice> devicesInRange(int id, Position p, float range) {
        List<MeshDevice> ret = new ArrayList<>();
        for (MeshDevice md : this.devices) {
            if (md.getId() != id && md.getPos().inRange(p, range)) ret.add(md);
        }
        return ret;
    }

    public List<MeshDevice> devicesInRange(MeshDevice md) {
        return this.devicesInRange(md.getId(), md.getPos(), md.getRange());
    }

    public boolean update() {
        boolean hadUpdates = false;
        this.lastTickBat = this.getCurrentBat();
        this.nTicks++;

        for (MeshDevice md : this.devices) {
            if (md.update()) hadUpdates = true;
        }

        for (MeshDevice md : this.devices) {
            md.nextCommands();
            this.nFailedMsg += md.getNFailedMessages();
        }

        return hadUpdates;
    }

    public void addDevices(HashMap<Integer, Position> devices) {
        for (Map.Entry<Integer, Position> e : devices.entrySet()) {
            int id = e.getKey();
            Position pos = e.getValue();
            MeshDevice d = DeviceFactory.deviceFromConfig(id, pos, this);
            this.addDevice(d);
        }
    }

    public int getTotalInitialBat() {
        int total = 0;
        for (MeshDevice md : this.devices) {
            total += md.getBattery().getTotalBattery();
        }
        return total;
    }

    public int getFailedMessages() {
        return this.nFailedMsg;
    }
}
