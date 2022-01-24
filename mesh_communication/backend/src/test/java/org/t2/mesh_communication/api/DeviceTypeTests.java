package org.t2.mesh_communication.api;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import com.fasterxml.jackson.databind.JsonNode;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.mockito.stubbing.Answer;
import org.t2.mesh_communication.API;
import org.t2.mesh_communication.Main;
import org.t2.mesh_communication.devices.*;
import org.t2.mesh_communication.devices.comm_strat.FloodStrategy;
import org.t2.mesh_communication.devices.components.Battery;
import org.t2.mesh_communication.devices.components.Screen;

public class DeviceTypeTests {
    private static API api;
    private static MeshGrid mg;

    @BeforeAll
    static void init() {
        api = new API();
        mg = Mockito.mock(MeshGrid.class);
        when(mg.getOrchestratorId()).thenReturn(0);

        Position pos = new Position(1, 1);
        Battery bat = new Battery(50, 7);
        Screen screen = new Screen(5, 10);
        Device device1 = new Device(1, pos, new FloodStrategy(mg), 10, 10, 1, bat, screen);

        Position pos2 = new Position(1, 1);
        Battery bat2 = new Battery(50, 7);
        Screen screen2 = new Screen(5, 10);
        Device device2 = new Device(2, pos2, new FloodStrategy(mg), 10, 10, 1, bat2, screen2);

        Orchestrator och = new Orchestrator(mg.getOrchestratorId(), pos, 1, new FloodStrategy(mg));

        when(mg.getDevices())
                .thenAnswer(
                        (Answer<List<MeshDevice>>)
                                invocation -> {
                                    List<MeshDevice> lmd = new ArrayList<>();
                                    lmd.add(och);
                                    lmd.add(device1);
                                    lmd.add(device2);
                                    return lmd;
                                });

        when(mg.devicesInRange(device1))
                .thenAnswer(
                        (Answer<List<MeshDevice>>)
                                invocation -> {
                                    List<MeshDevice> lmd = new ArrayList<>();
                                    lmd.add(device2);
                                    return lmd;
                                });

        when(mg.devicesInRange(device2))
                .thenAnswer(
                        (Answer<List<MeshDevice>>)
                                invocation -> {
                                    List<MeshDevice> lmd = new ArrayList<>();
                                    lmd.add(device1);
                                    return lmd;
                                });

        Main main = new Main();
        main.setMeshGrid(mg);
        api.setMain(main);
    }

    @Test
    public void testDevice() {
        JsonNode outputOch = api.devices(0, Mockito.mock(HttpServletResponse.class));
        assertEquals("BOOLEAN", outputOch.get("orchestrator").getNodeType().toString());

        JsonNode output = api.devices(1, Mockito.mock(HttpServletResponse.class));

        assertEquals("NUMBER", output.get("id").getNodeType().toString());
        assertEquals("NUMBER", output.get("position").get("x").getNodeType().toString());
        assertEquals("NUMBER", output.get("position").get("y").getNodeType().toString());
        assertEquals("NUMBER", output.get("battery_max").getNodeType().toString());
        assertEquals("NUMBER", output.get("battery_level").getNodeType().toString());
    }
}
