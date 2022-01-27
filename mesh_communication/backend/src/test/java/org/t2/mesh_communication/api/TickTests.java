package org.t2.mesh_communication.api;

import static org.junit.jupiter.api.Assertions.assertEquals;

import javax.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.t2.mesh_communication.API;
import org.t2.mesh_communication.Main;
import org.t2.mesh_communication.devices.MeshGrid;

public class TickTests {
    private static API api;

    @BeforeEach
    public void init() {
        api = new API();
        Main main = new Main();
        MeshGrid mg = Mockito.mock(MeshGrid.class);
        main.setMeshGrid(mg);
        api.setMain(main);
    }

    @Test
    public void tickTest() {
        String output = api.tick("forwards", 1, Mockito.mock(HttpServletResponse.class));
        assertEquals("Mesh Grid updated", output);

        String outputInvalidTimeflow =
                api.tick("invalid", 1, Mockito.mock(HttpServletResponse.class));
        assertEquals("Invalid time flow.", outputInvalidTimeflow);

        String outputNegTicks = api.tick("forwards", -1, Mockito.mock(HttpServletResponse.class));
        assertEquals("NTicks must be a number of value higher than 0.", outputNegTicks);
    }

    @Test
    public void undoTest() {
        String badOutput = api.tick("backwards", 1, Mockito.mock(HttpServletResponse.class));
        assertEquals("Invalid time flow: Can't undo that many ticks.", badOutput);

        api.tick("forwards", 1, Mockito.mock(HttpServletResponse.class));
        String output = api.tick("backwards", 1, Mockito.mock(HttpServletResponse.class));
        assertEquals("Mesh Grid updated", output);
    }
}
