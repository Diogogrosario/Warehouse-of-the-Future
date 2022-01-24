package org.t2.mesh_communication;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.t2.mesh_communication.devices.*;
import org.t2.mesh_communication.devices.comm_strat.FloodStrategy;
import org.t2.mesh_communication.devices.command.ReceiveMsgCmd;
import org.t2.mesh_communication.devices.components.Battery;
import org.t2.mesh_communication.devices.components.Screen;
import org.t2.mesh_communication.devices.messages.RequestMessage;

public class MeshGridTests {
    @Test
    public void meshGridTests() {
        MeshGrid mg = new MeshGrid(0);

        Battery bat = new Battery(50, 7);
        Screen screen = new Screen(5, 10);
        Position pos = new Position(1, 1);
        Position fakePos = new Position(1, 2);

        MeshDevice device1 = new Device(1, pos, new FloodStrategy(mg), 10, 10, 1, bat, screen);
        MeshDevice device2 = new Device(2, pos, new FloodStrategy(mg), 10, 10, 1, bat, screen);

        mg.addDevice(device1);
        assertEquals(1, mg.getDevices().size());
        mg.addDevice(device2);
        assertNotEquals(1, mg.getDevices().size());

        List<MeshDevice> devicesInRange = mg.devicesInRange(device1);
        assertEquals(1, devicesInRange.size());

        device1.addCommand(
                new ReceiveMsgCmd(device1, new RequestMessage(device1.getId(), 1, 0, ""), 0));
        boolean updateOnce = mg.update();
        boolean updateTwice = mg.update();
        assertFalse(updateOnce);
        assertTrue(updateTwice);
    }

    @Test
    void testDeviceFailure() {
        MeshGrid meshGrid = new MeshGrid(0);
        Orchestrator orchestrator =
                new Orchestrator(
                        meshGrid.getOrchestratorId(),
                        new Position(-1, 0),
                        1,
                        new FloodStrategy(meshGrid));

        meshGrid.addDevice(orchestrator);

        Battery bat = Mockito.mock(Battery.class);
        Mockito.when(bat.getRemainingBattery()).thenReturn(Integer.MAX_VALUE);

        for (int i = 0; i < 8; ++i) {

            Device d =
                    new Device(
                            i + 1,
                            new Position(i % 3, i / 3),
                            new FloodStrategy(meshGrid),
                            0,
                            0,
                            1,
                            bat,
                            Mockito.mock(Screen.class));
            meshGrid.addDevice(d);
        }

        Battery bat_dead = Mockito.mock(Battery.class);
        Mockito.when(bat_dead.getRemainingBattery()).thenReturn(Integer.MAX_VALUE);
        Device toBeDead =
                new Device(
                        9,
                        new Position(2, 2),
                        new FloodStrategy(meshGrid),
                        0,
                        0,
                        1,
                        bat_dead,
                        Mockito.mock(Screen.class));
        meshGrid.addDevice(toBeDead);

        orchestrator.sendMessage(orchestrator.createMessage(8, "Ola1"));

        for (int i = 0; i < 50; ++i) {
            meshGrid.update();
        }

        // Disabling Device 9
        Mockito.when(bat_dead.getRemainingBattery()).thenReturn(0);

        for (int i = 0; i < 7; ++i) {
            orchestrator.sendMessage(orchestrator.createMessage(7, "Ola" + (i + 2)));

            meshGrid.update();
        }

        for (int i = 0; i < 9; ++i) {
            meshGrid.update();
        }

        List<MeshDevice> devices = meshGrid.getDevices();

        // Devices 6 and 7 are in 9 range (will detect it is dead)
        List<Integer> dead6 = devices.get(6).getDeadNeighbors();
        assertEquals(1, dead6.size());
        assertEquals(9, dead6.get(0));
        List<Integer> dead8 = devices.get(8).getDeadNeighbors();
        assertEquals(1, dead8.size());
        assertEquals(9, dead8.get(0));

        // Check if all other devices are alive
        for (int i = 0; i < 9; ++i) {
            for (Map.Entry<Integer, Integer> deviceLife :
                    devices.get(i).getNeighborTTLs().entrySet()) {
                if (deviceLife.getKey() != 9) assertTrue(deviceLife.getValue() > 0);
            }
        }
    }
}
