package devices;

import java.util.ArrayList;
import java.util.List;

public class Orchestrator {
    private final List<Device> devices;

    public Orchestrator() {
        this.devices = new ArrayList<>();
    }

    public Orchestrator(int deviceN) {
        this();
        for (int i = 0; i < deviceN; ++i) {
            this.devices.add(new Device());
        }
    }
}
