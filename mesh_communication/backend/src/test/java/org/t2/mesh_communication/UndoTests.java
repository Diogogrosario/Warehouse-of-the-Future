package org.t2.mesh_communication;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.io.IOException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class UndoTests {
    private Main main;

    @BeforeEach
    void setUp() throws IOException {
        main = new Main();
        Main.prepareConfigs();
        main.prepareGrid();
        main.orchestrate();
    }

    @Test
    public void simpleUndoTest() {
        int initBattery = main.getMeshGrid().getCurrentBat();
        main.advanceTick(1);
        main.goBackTick(1);

        int finalBattery = main.getMeshGrid().getCurrentBat();

        assertEquals(initBattery, finalBattery);
    }

    @Test
    public void manyUndoTest() {
        main.advanceTick(1);
        int initBattery = main.getMeshGrid().getCurrentBat();
        main.advanceTick(3);
        main.goBackTick(3);
        int finalBattery = main.getMeshGrid().getCurrentBat();

        assertEquals(initBattery, finalBattery);

        main.advanceTick(3);
        initBattery = main.getMeshGrid().getCurrentBat();
        main.advanceTick(5);
        main.goBackTick(5);
        finalBattery = main.getMeshGrid().getCurrentBat();

        assertEquals(initBattery, finalBattery);
    }
}
