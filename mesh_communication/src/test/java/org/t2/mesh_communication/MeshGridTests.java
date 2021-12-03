package org.t2.mesh_communication;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.mockito.Mockito;
import org.t2.mesh_communication.devices.*;
import org.t2.mesh_communication.devices.components.Battery;
import org.t2.mesh_communication.devices.components.Screen;

import java.util.List;
import java.util.Map;

public class MeshGridTests {
    @Test
    void testDeviceFailure() {
        MeshGrid meshGrid = new MeshGrid();
        Orchestrator orchestrator = new Orchestrator(new Position(-1, 0), meshGrid);

        meshGrid.addDevice(orchestrator);

        Battery bat = Mockito.mock(Battery.class);
        Mockito.when(bat.getRemainingBattery()).thenReturn(Integer.MAX_VALUE);

        for (int i = 0; i < 8; ++i) {

            Device d = new Device(i + 1,
                    new Position(i % 3, i / 3),
                    meshGrid,
                    0,
                    0,
                    bat,
                    Mockito.mock(Screen.class));
            meshGrid.addDevice(d);
        }

        Battery bat_dead = Mockito.mock(Battery.class);
        Mockito.when(bat_dead.getRemainingBattery()).thenReturn(Integer.MAX_VALUE);
        Device toBeDead = new Device(9,
                new Position(2, 2),
                meshGrid,
                0,
                0,
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
        assertEquals(0, devices.get(6).getDevicesLife().get(9));
        assertEquals(0, devices.get(8).getDevicesLife().get(9));

        // Check if all other devices are alive
        for (int i = 0; i < 9; ++i) {
            for (Map.Entry<Integer, Integer> deviceLife : devices.get(i).getDevicesLife().entrySet()) {
                if (deviceLife.getKey() != 9)
                    assertTrue(deviceLife.getValue() > 0);
            }
        }
    }
}
