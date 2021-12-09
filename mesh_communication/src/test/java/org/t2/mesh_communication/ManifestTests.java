package org.t2.mesh_communication;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.t2.mesh_communication.config.ManifestGenerator;
import org.t2.mesh_communication.config.ManifestReader;
import org.t2.mesh_communication.config.Product;
import org.t2.mesh_communication.devices.Position;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.Scanner;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class ManifestTests {
    @Test
    public void testGenerateManifests() {
        ManifestGenerator m = new ManifestGenerator(3);

        long seed = 123;
        Random random = new Random(seed);
        assertDoesNotThrow(() -> m.generate(random));

        Scanner scanner = null;
        try {
            scanner =
                    new Scanner(
                            new File(ManifestReader.FILE_DIR + File.separator + m.getFileName()));
        } catch (FileNotFoundException e) {
            Assertions.fail();
        }

        // Read gen products into list
        List<Product> prods = new ArrayList<>();
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            String[] elems = line.split(";");
            Position pos = new Position(Integer.parseInt(elems[1]), Integer.parseInt(elems[2]));
            int id = Integer.parseInt(elems[0]), quantity = Integer.parseInt(elems[3]);
            prods.add(new Product(id, pos, quantity));
        }

        assertEquals(3, prods.size());
        // This products are the result of using the seed 123
        assertEquals(new Product(1749, new Position(2, 0), 20), prods.get(0));
        assertEquals(new Product(1585, new Position(0, 0), 54), prods.get(1));
        assertEquals(new Product(2416, new Position(3, 3), 22), prods.get(2));
    }

    @Test
    public void testReadManifests() {
        String manifestFile = "1;1;1;10\n2;3;3;50\n";

        InputStream inputStream =
                new ByteArrayInputStream(manifestFile.getBytes(StandardCharsets.UTF_8));
        ManifestReader reader = new ManifestReader(inputStream);
        List<Product> products = reader.getProducts();
        assertEquals(2, products.size());
        assertEquals(new Product(1, new Position(1, 1), 10), products.get(0));
        assertEquals(new Product(2, new Position(3, 3), 50), products.get(1));
    }
}
