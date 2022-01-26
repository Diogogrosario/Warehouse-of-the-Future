package org.t2.mesh_communication.api;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import com.fasterxml.jackson.databind.JsonNode;
import javax.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.mockito.stubbing.Answer;
import org.t2.mesh_communication.API;
import org.t2.mesh_communication.Main;
import org.t2.mesh_communication.devices.*;

public class MetricsTest {
    private static API api;
    private static MeshGrid mg;

    @BeforeAll
    static void init() {
        api = new API();
        mg = Mockito.mock(MeshGrid.class);

        when(mg.getTotalInitialBat()).thenAnswer((Answer<Integer>) invocation -> 5);
        when(mg.getCurrentBat()).thenAnswer((Answer<Integer>) invocation -> 4);
        when(mg.getLastTickBat()).thenAnswer((Answer<Integer>) invocation -> 1);
        when(mg.getNTicks()).thenAnswer((Answer<Integer>) invocation -> 1);
        when(mg.getFailedMessages()).thenAnswer((Answer<Integer>) invocation -> 2);
        Main main = new Main();
        main.setMeshGrid(mg);
        api.setMain(main);
    }

    @Test
    public void testMetrics() {
        JsonNode output = api.getMetrics(Mockito.mock(HttpServletResponse.class));
        System.out.println(output);

        assertEquals(0, output.get("batTick").intValue());
        assertEquals(1, output.get("batCommunication").intValue());
        assertEquals(2, output.get("failed").intValue());
        assertEquals(1, output.get("ticks").intValue());
    }
}
