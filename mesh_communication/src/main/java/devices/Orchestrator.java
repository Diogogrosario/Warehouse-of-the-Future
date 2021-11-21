package devices;

import java.util.ArrayList;
import java.util.List;

/**
 * The class responsible for managing the mesh network.
 */
public class Orchestrator extends MeshDevice {
    private final List<Device> devices;

    public Orchestrator(Position pos, MeshGrid meshGrid) {
        // TODO don't hard code range
        super(0, pos, 1, meshGrid);
        this.devices = new ArrayList<>();
    }

    @Override
    public void sendMessage(Message msg) {
        for (MeshDevice d : this.meshGrid.devicesInRange(this)) {
            System.out.printf("Orchestrator sent message: [destination=%d], [msg=%s]\n", msg.getDestination(), msg.getContent());
            d.receiveMessage(msg);
        }
    }

    @Override
    public boolean receiveMessage(Message msg) {
        return true;
    }
}
