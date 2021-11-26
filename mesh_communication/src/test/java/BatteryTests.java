import devices.Device;
import devices.MeshGrid;
import devices.Message;
import devices.Position;
import devices.components.Battery;
import devices.components.Light;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class BatteryTests {
    private static Device device;

    @BeforeAll
    static void init() {
        MeshGrid mg = Mockito.mock(MeshGrid.class);
        Position pos = Mockito.mock(Position.class);
        Battery bat = new Battery(50, 5);
        List<Light> lights = new ArrayList<>();
        lights.add(new Light(5, 10, "yellow"));

        device = new Device(1, pos, mg, 10, 10, bat, lights);
    }

    @Test
    void sendConsumptionTest() {
        int startBattery = device.getBattery().getRemainingBattery();
        int expectedBattery = startBattery - device.getSendingConsumption();

        Message msg = new Message(0, 0, 0, "");
        device.sendMessage(msg);

        int finalBattery = device.getBattery().getRemainingBattery();

        assertEquals(expectedBattery, finalBattery);
    }



}
