package devices;

/**
 * The class responsible for managing the mesh network.
 */
public class Orchestrator extends MeshDevice {
    public Orchestrator(Position pos, MeshGrid meshGrid) {
        // TODO don't hard code range
        super(0, pos, 1, meshGrid);
    }

    @Override
    public void sendMessage(Message msg) {
        System.out.printf("Orchestrator sent message: [destination=%d], [msg=%s]\n", msg.getDestination(), msg.getContent());
        super.sendMessage(msg);
    }

    @Override
    public boolean receiveMessage(Message msg) {
        return true;
    }
}
