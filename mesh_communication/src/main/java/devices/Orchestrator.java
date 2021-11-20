package devices;

import java.util.ArrayList;
import java.util.List;

/**
 * The class responsible for managing the mesh network.
 */
public class Orchestrator {
    private final Position pos;
    private final List<Device> devices;

    public Orchestrator(Position p) {
        this.pos = p;
        this.devices = new ArrayList<>();
    }

    public Orchestrator(Position p, int deviceN) {
        this(p);
        // create the devices
        for (int i = 0; i < deviceN; ++i) {
            this.devices.add(new Device(new Position(i / 3, i % 3)));
        }
    }
}
