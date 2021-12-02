package org.t2.mesh_communication.devices;

import java.util.ArrayList;
import java.util.List;

public class MeshGrid {
    List<MeshDevice> devices;

    public MeshGrid() {
        this.devices = new ArrayList<>();
    }

    public void addDevice(MeshDevice d) {
        this.devices.add(d);
    }

    public List<MeshDevice> devicesInRange(int id, Position p, float range) {
        List<MeshDevice> ret = new ArrayList<>();
        for (MeshDevice md : this.devices) {
            if (md.id != id && md.getPos().inRange(p, range)) ret.add(md);
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

        return hadUpdates;
    }
}
