package org.t2.mesh_communication.api;

import org.junit.jupiter.api.BeforeAll;
import org.mockito.Mockito;
import org.t2.mesh_communication.API;
import org.t2.mesh_communication.Main;
import org.t2.mesh_communication.devices.MeshGrid;

public class LayoutTests {

    private static API api;

    @BeforeAll
    public static void init() {
        api = new API();
        Main main = new Main();
        MeshGrid mg = Mockito.mock(MeshGrid.class);
        main.setMeshGrid(mg);
        api.setMain(main);
    }
}
