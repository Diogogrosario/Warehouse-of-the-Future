package org.t2.mesh_communication.config;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.*;

public class ManifestGenerator {
    public static final String FILE = "manifests.csv";
    public static final String FILE_DIR = "files/";
    public static final String FILE_SEPARATOR = ";";
    public static final int MAX_QNT = 100;

    private List<Integer> devicesIds;
    private final Integer nManifests;

    // IMP: This class only generates random manifests for a grid atm
    // Min and max are opposite corners of the grid
    // If nManifests surpasses the number of possible spots, pieces may overlap
    public ManifestGenerator(int nManifests, Set<Integer> deviceIds) {
        this.nManifests = nManifests;
        this.devicesIds = new ArrayList<>();
        devicesIds.addAll(deviceIds);
    }

    public static boolean manifestFileExists() {
        File file = new File(FILE_DIR + FILE);
        return file.exists();
    }

    public void generate() throws IOException {
        // create file
        File f = new File(FILE_DIR + FILE);
        File directory = new File(FILE_DIR);
        if (!directory.exists()) directory.mkdir();
        f.createNewFile();

        // gen manifests and write to file
        Random rand = new Random();
        BufferedWriter manifests = new BufferedWriter((new FileWriter(f)));
        Collections.shuffle(devicesIds, rand);

        for (int i = 0; i < nManifests; ++i) {
            String quantity = Integer.toString(rand.nextInt(MAX_QNT));
            int id = devicesIds.get(i % this.nManifests);
            String manifest = id + FILE_SEPARATOR + quantity;
            manifests.write(manifest + "\n");
        }
        manifests.close();
    }
}
