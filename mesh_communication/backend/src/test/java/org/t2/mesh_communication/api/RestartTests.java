package org.t2.mesh_communication.api;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.LogRecord;
import java.util.logging.StreamHandler;
import javax.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import org.mockito.stubbing.Answer;
import org.t2.mesh_communication.API;
import org.t2.mesh_communication.Main;
import org.t2.mesh_communication.devices.*;
import org.t2.mesh_communication.devices.comm_strat.FloodStrategy;
import org.t2.mesh_communication.devices.command.Command;
import org.t2.mesh_communication.devices.components.Battery;
import org.t2.mesh_communication.devices.components.Screen;
import org.t2.mesh_communication.log.Logger;

public class RestartTests {
    private static API api;
    private static Main main;
    private static Logger logger;
    private static MockedStatic<Logger> loggerStat;
    private static MeshGrid mg;

    @BeforeAll
    public static void init() throws IOException {
        api = new API();
        loggerStat = Mockito.mockStatic(Logger.class);
        logger = Mockito.spy(Logger.class);
        mg = Mockito.mock(MeshGrid.class);
        main = Mockito.spy(Main.class);

        loggerStat.when(Logger::getInstance).thenReturn(logger);

        logger.setHandlers(List.of(Mockito.mock(StreamHandler.class)));

        api.setMain(main);

        Position pos = new Position(1, 1);
        Battery bat = new Battery(50, 7);
        Screen screen = new Screen(5, 10);
        Device device1 = new Device(1, pos, new FloodStrategy(mg), 10, 10, 1, bat, screen);

        Position pos2 = new Position(1, 1);
        Battery bat2 = new Battery(50, 7);
        Screen screen2 = new Screen(5, 10);
        Device device2 = new Device(2, pos2, new FloodStrategy(mg), 10, 10, 1, bat2, screen2);

        Position pos3 = new Position(1, 1);
        Battery bat3 = new Battery(50, 7);
        Screen screen3 = new Screen(5, 10);
        Device device3 = new Device(1, pos3, new FloodStrategy(mg), 10, 10, 1, bat3, screen3);

        Position pos4 = new Position(1, 1);
        Battery bat4 = new Battery(50, 7);
        Screen screen4 = new Screen(5, 10);
        Device device4 = new Device(2, pos4, new FloodStrategy(mg), 10, 10, 1, bat4, screen4);

        Orchestrator och = new Orchestrator(0, pos, 1, new FloodStrategy(mg));

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

        doAnswer(
                        invocation -> {
                            when(mg.getDevices())
                                    .thenAnswer(
                                            (Answer<List<MeshDevice>>)
                                                    invocation2 -> {
                                                        List<MeshDevice> lmd = new ArrayList<>();
                                                        lmd.add(och);
                                                        lmd.add(device3);
                                                        lmd.add(device4);
                                                        return lmd;
                                                    });
                            return null;
                        })
                .when(main)
                .prepareGrid();

        when(mg.update())
                .thenAnswer(
                        invocation -> {
                            device1.getBattery().spendBattery(6);
                            device2.getBattery().spendBattery(5);
                            Command commandMock = Mockito.mock(Command.class);
                            device1.getNextCommands().add(commandMock);
                            LogRecord logMock = Mockito.mock(LogRecord.class);
                            Logger.getInstance().publish(logMock);
                            return null;
                        });

        main.setMeshGrid(mg);
    }

    @Test
    public void restartTest() {
        api.tick("forwards", 1, Mockito.mock(HttpServletResponse.class));

        assertEquals(3, mg.getDevices().size());

        assertEquals(44, ((Device) mg.getDevices().get(1)).getBattery().getRemainingBattery());
        assertEquals(45, ((Device) mg.getDevices().get(2)).getBattery().getRemainingBattery());

        assertEquals(1, mg.getDevices().get(1).getCommandsNext().size());

        assertEquals(1, Logger.getInstance().getTick());
        assertEquals(2, Logger.getInstance().getHistory().size());

        api.restart(Mockito.mock(HttpServletResponse.class));

        assertEquals(3, mg.getDevices().size());
        assertEquals(50, ((Device) mg.getDevices().get(1)).getBattery().getRemainingBattery());
        assertEquals(50, ((Device) mg.getDevices().get(2)).getBattery().getRemainingBattery());

        assertEquals(0, mg.getDevices().get(1).getCommandsNext().size());

        assertEquals(0, Logger.getInstance().getTick());
        assertEquals(1, Logger.getInstance().getHistory().size());

        loggerStat.close();
    }
}
