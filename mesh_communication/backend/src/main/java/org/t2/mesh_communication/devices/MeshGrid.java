package org.t2.mesh_communication.devices;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Component;
import org.t2.mesh_communication.devices.comm_strat.FloodStrategy;

/**
 * Holder of the network devices. Represents the network and distributes the tick update commands to
 * all devices. Can be queried to find devices in a certain range.
 */
@Component
public class MeshGrid {
    public static final int ORCHESTRATOR_ID = 0;

    private MeshDevice orchestrator;
    private List<MeshDevice> devices;

    public MeshGrid() {
        this.orchestrator = null;
        this.devices = new ArrayList<>();
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

    public void addDevice(MeshDevice d) {
        this.devices.add(d);
        if (d.getId() == MeshGrid.ORCHESTRATOR_ID) {
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

        for (MeshDevice md : this.devices) {
            if (md.update()) hadUpdates = true;
        }

        for (MeshDevice md : this.devices) {
            md.nextCommands();
        }

        return hadUpdates;
    }

    public void addDevices(HashMap<Integer, Position> devices) {
        for (Map.Entry<Integer, Position> e : devices.entrySet()) {
            int id = e.getKey();
            Position pos = e.getValue();
            MeshDevice d = DeviceFactory.deviceFromConfig(id, pos, new FloodStrategy(this));
            this.addDevice(d);
        }
    }
}
