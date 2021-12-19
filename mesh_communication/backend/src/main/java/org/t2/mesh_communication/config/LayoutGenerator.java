package org.t2.mesh_communication.config;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;
import org.t2.mesh_communication.devices.Position;

/** Generates a file with sequential ids and random positions. */
public class LayoutGenerator {
    public static final String FILE = "layout.csv";
    public static final String FILE_DIR = "files/";
    public static final String SEPARATOR = ";";

    private final Position min;
    private final Position max;
    private final int nDevices;

    public LayoutGenerator(int nDevices, Position min, Position max) {
        this.nDevices = nDevices;
        this.min = min;
        this.max = max;
    }

    public LayoutGenerator(int nDevices, int maxRows, int maxCols) {
        this(nDevices, new Position(0, 0), new Position(maxRows, maxCols));
    }

    public static boolean layoutFileExists() {
        File file = new File(FILE_DIR + FILE);
        return file.exists();
    }

    private List<Position> possiblePositions() {
        List<Position> res = new ArrayList<>();
        for (int i = min.getX(); i <= max.getX(); ++i) {
            for (int j = min.getY(); j <= max.getY(); ++j) res.add(new Position(i, j));
        }

        return res;
    }

    public void generate() throws IOException {
        // create file
        File f = new File(FILE_DIR + FILE);
        File directory = new File(FILE_DIR);
        if (!directory.exists()) directory.mkdir();
        f.createNewFile();

        // add devices to file
        BufferedWriter layoutFile = new BufferedWriter((new FileWriter(f)));
        List<Position> positions = possiblePositions();
        Collections.shuffle(positions, new Random());

        for (int i = 0; i < this.nDevices; ++i) {
            Position p = positions.get(i % this.nDevices);
            String device = i + SEPARATOR + p.getX() + SEPARATOR + p.getY();
            layoutFile.write(device + "\n");
        }
        layoutFile.close();
    }
}
