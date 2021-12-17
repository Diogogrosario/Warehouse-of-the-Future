package org.t2.mesh_communication.config;

import static org.t2.mesh_communication.config.ManifestReader.FILE_DIR;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;
import org.t2.mesh_communication.devices.Position;

public class ManifestGenerator {
    private final String fileName;

    // Random generation params
    private static final Integer maxId = 10000;
    private static final Integer maxQuantity = 100;
    private final Integer nManifests;
    private Position min;
    private Position max;

    // IMP: This class only generates random manifests for a grid atm
    // Min and max are opposite corners of the grid
    // If nManifests surpasses the number of possible spots, pieces may overlap
    public ManifestGenerator(Integer nManifests, Position min, Position max, String fileName) {
        this.nManifests = nManifests;
        this.fileName = fileName;
        this.min = min;
        this.max = max;
    }

    public ManifestGenerator(Integer nManifests) {
        this(nManifests, new Position(0, 0), new Position(3, 3), "manifests.csv");
    }

    public String getFileName() {
        return fileName;
    }

    private List<Position> possiblePositions() {
        List<Position> res = new ArrayList<>();
        for (int i = min.getX(); i <= max.getX(); ++i)
            for (int j = min.getY(); j <= max.getY(); ++j) res.add(new Position(i, j));

        return res;
    }

    public void generate() throws IOException {
        generate(new Random());
    }

    public void generate(Random r) throws IOException { // Inject random for testing purposes
        // Create file
        File f = new File(FILE_DIR + File.separator + fileName);
        File directory = new File(FILE_DIR);
        if (!directory.exists()) directory.mkdir();
        f.createNewFile();

        // Gen manifests and write to file
        BufferedWriter manifests = new BufferedWriter((new FileWriter(f)));
        List<Position> positions = possiblePositions();
        Collections.shuffle(positions, r);

        for (int i = 0; i < nManifests; ++i) {
            String id = Integer.toString(r.nextInt(maxId));
            String quantity = Integer.toString(r.nextInt(maxQuantity));

            Position p = positions.get(i % this.nManifests);
            String manifest = id + ";" + p.getX() + ";" + p.getY() + ";" + quantity;
            manifests.write(manifest + "\n");
        }
        manifests.close();
    }
}
