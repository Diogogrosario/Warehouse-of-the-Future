package org.t2.mesh_communication.api;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.t2.mesh_communication.API;
import org.t2.mesh_communication.Main;
import org.t2.mesh_communication.devices.*;

public class LayoutTests {

    private static API api;
    private static Main main;

    @BeforeAll
    public static void init() {
        api = new API();
        main = new Main();
        api.setMain(main);
    }

    @Test
    public void changeLayout() throws IOException {
        String newLayout =
                "{\"0\": [{\"x\": 7,\"y\": 4,\"z\": -3}], \"1\": [{\"x\": 1,\"y\": 2,\"z\": 3}]} ";
        TypeReference<Map<String, Object>> typeReference = new TypeReference<>() {};
        Map<String, Object> map = new ObjectMapper().readValue(newLayout, typeReference);

        List<MeshDevice> devices = main.getMeshGrid().getDevices();
        assertEquals(0, devices.size());
        api.layout(map, Mockito.mock(HttpServletResponse.class));
        devices = main.getMeshGrid().getDevices();
        assertEquals(2, devices.size());

        Position orchestratorPos = new Position(7, 4, -3);
        MeshDevice orchestrator = devices.get(0);
        assertEquals(0, orchestrator.getId());
        assertEquals(orchestratorPos, orchestrator.getPos());

        Position devicePos = new Position(1, 2, 3);
        MeshDevice device = devices.get(1);
        assertEquals(1, device.getId());
        assertEquals(devicePos, device.getPos());
    }
}
