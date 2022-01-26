package org.t2.mesh_communication.api;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.mockito.stubbing.Answer;
import org.t2.mesh_communication.API;
import org.t2.mesh_communication.Main;
import org.t2.mesh_communication.devices.Device;
import org.t2.mesh_communication.devices.MeshDevice;
import org.t2.mesh_communication.devices.MeshGrid;
import org.t2.mesh_communication.devices.Position;
import org.t2.mesh_communication.devices.comm_strat.FloodStrategy;
import org.t2.mesh_communication.devices.components.Battery;
import org.t2.mesh_communication.devices.components.Screen;

public class DeviceTests {
    private static API api;
    private static MeshGrid mg;

    @BeforeAll
    static void init() {
        api = new API();
        mg = Mockito.mock(MeshGrid.class);
        MeshGrid mg = Mockito.mock(MeshGrid.class);

        Position pos = new Position(1, 1);
        Battery bat = new Battery(50, 7);
        Screen screen = new Screen(5, 10);
        Device device1 = new Device(1, pos, new FloodStrategy(mg), 10, 10, 1, bat, screen);

        Position pos2 = new Position(1, 1);
        Battery bat2 = new Battery(50, 7);
        Screen screen2 = new Screen(5, 10);
        Device device2 = new Device(2, pos2, new FloodStrategy(mg), 10, 10, 1, bat2, screen2);

        when(mg.getDevices())
                .thenAnswer(
                        (Answer<List<MeshDevice>>)
                                invocation -> {
                                    List<MeshDevice> lmd = new ArrayList<>();
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

    private String listToString(List<JsonNode> in) {
        StringBuilder out = new StringBuilder("[");
        for (int i = 0; i < in.size(); i++) {
            out.append(in.get(i).toString());
            if (i != in.size() - 1) out.append(", ");
        }
        out.append("]");

        return out.toString();
    }

    @Test
    public void getDevicesTest() {
        String expectedOutput =
                "[{\"id\":1,\"battery_max\":50,\"battery_level\":50,\"position\":{\"x\":1,\"y\":1,\"z\":0}}, {\"id\":2,\"battery_max\":50,\"battery_level\":50,\"position\":{\"x\":1,\"y\":1,\"z\":0}}]";
        List<JsonNode> output = api.devicesStatus("all", Mockito.mock(HttpServletResponse.class));

        String outputString = listToString(output);

        assertEquals(expectedOutput, outputString.toString());

        List<JsonNode> outputFail =
                api.devicesStatus("failed", Mockito.mock(HttpServletResponse.class));

        assertEquals("[]", outputFail.toString());

        List<JsonNode> outputInvalid =
                api.devicesStatus("invalidParameter", Mockito.mock(HttpServletResponse.class));

        assertEquals("[]", outputFail.toString());
    }

    @Test
    public void getSpecificDeviceTest() {
        String expectedOutput =
                "{\"id\":1,\"battery_max\":50,\"battery_level\":50,\"position\":{\"x\":1,\"y\":1,\"z\":0}}";
        JsonNode output = api.devices(1, Mockito.mock(HttpServletResponse.class));
        assertEquals(expectedOutput, output.toString());

        int invalidID = 23;
        JsonNode outputInvalid = api.devices(invalidID, Mockito.mock(HttpServletResponse.class));
        assertNull(outputInvalid);
    }

    @Test
    public void getInRangeDevicesTest() {
        String expectedOutput =
                "[{\"id\":2,\"battery_max\":50,\"battery_level\":50,\"position\":{\"x\":1,\"y\":1,\"z\":0}}]";
        List<JsonNode> output = api.devicesInRange(1, Mockito.mock(HttpServletResponse.class));

        String outputString = listToString(output);
        assertEquals(expectedOutput, outputString);
    }

    @Test
    public void getAllInRangeDevicesTest() {
        ObjectNode output = api.allInRange(Mockito.mock(HttpServletResponse.class));
        assertFalse(output.isEmpty());

        assertTrue(output.has("1"));
        assertTrue(output.has("2"));

        assertTrue(output.get("1").isArray());
        assertTrue(output.get("2").isArray());

        assertEquals(1, output.get("1").size());
        assertEquals(1, output.get("2").size());

        String expectedDevice2 =
                "{\"id\":2,\"battery_max\":50,\"battery_level\":50,\"position\":{\"x\":1,\"y\":1,\"z\":0}}";
        assertEquals(expectedDevice2, output.get("1").get(0).toString());

        String expectedDevice1 =
                "{\"id\":1,\"battery_max\":50,\"battery_level\":50,\"position\":{\"x\":1,\"y\":1,\"z\":0}}";
        assertEquals(expectedDevice1, output.get("2").get(0).toString());
    }
}
