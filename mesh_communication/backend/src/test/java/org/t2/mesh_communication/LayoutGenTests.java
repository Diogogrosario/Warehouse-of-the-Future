package org.t2.mesh_communication;

import static org.junit.jupiter.api.Assertions.*;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.*;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.t2.mesh_communication.config.LayoutGenerator;
import org.t2.mesh_communication.config.LayoutReader;
import org.t2.mesh_communication.devices.Position;

public class LayoutGenTests {
    private static int nDevices, maxRows, maxCols;
    private static LayoutGenerator generator;

    @BeforeAll
    static void init() {
        nDevices = 9;
        maxRows = 2;
        maxCols = 2;
        generator = new LayoutGenerator(nDevices, maxRows, maxCols);
    }

    @Test
    public void testGenerateLayout() {
        // generate devices
        assertDoesNotThrow(() -> generator.generate());

        // read devices from file
        HashMap<Integer, Position> devices = getDevicesFromFile();

        // test number of devices
        assertEquals(nDevices, devices.size());

        // test uniqueness of positions
        Set<Position> uniquePositions = new HashSet<>(devices.values());
        assertEquals(uniquePositions.size(), devices.values().size());

        // test generated rows & cols
        int maxGenRow = -1,
                maxGenCol = -1,
                minGenRow = Integer.MAX_VALUE,
                minGenCol = Integer.MAX_VALUE;
        for (Position d : devices.values()) {
            maxGenRow = Math.max(maxGenRow, d.getX());
            maxGenCol = Math.max(maxGenCol, d.getY());
            minGenRow = Math.min(minGenRow, d.getX());
            minGenCol = Math.min(minGenCol, d.getY());
        }
        assertTrue(maxRows <= maxGenRow);
        assertTrue(maxCols <= maxGenCol);
        assertTrue(0 <= minGenRow);
        assertTrue(0 <= minGenCol);
    }

    @Test
    public void testReadLayout() {
        String layout = "1;1;1\n2;3;3\n";

        InputStream inputStream = new ByteArrayInputStream(layout.getBytes(StandardCharsets.UTF_8));
        LayoutReader reader = new LayoutReader(inputStream);
        try {
            reader.read();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        HashMap<Integer, Position> devices = reader.getDevices();

        // test number of devices
        assertEquals(2, devices.size());

        // test devices ids
        assertTrue(devices.containsKey(1));
        assertTrue(devices.containsKey(2));

        // test positions
        Position p1 = devices.get(1), p2 = devices.get(2);
        assertEquals(new Position(1, 1), p1);
        assertEquals(new Position(3, 3), p2);
    }

    private HashMap<Integer, Position> getDevicesFromFile() {
        Scanner scanner = null;
        try {
            scanner = new Scanner(new File(LayoutGenerator.FILE_DIR + LayoutGenerator.FILE));
        } catch (FileNotFoundException e) {
            Assertions.fail();
        }

        HashMap<Integer, Position> devices = new HashMap<>();
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            String[] contents = line.split(LayoutGenerator.SEPARATOR);
            if (contents.length != 3) throw new InputMismatchException();

            int id = Integer.parseInt(contents[0]);
            int x = Integer.parseInt(contents[1]), y = Integer.parseInt(contents[2]);
            Position pos = new Position(x, y);

            devices.put(id, pos);
        }
        return devices;
    }
}
