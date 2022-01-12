package org.t2.mesh_communication;

import static org.junit.jupiter.api.Assertions.*;
import static org.t2.mesh_communication.config.LayoutGenerator.SEPARATOR;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.*;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.t2.mesh_communication.config.ManifestGenerator;
import org.t2.mesh_communication.config.ManifestReader;
import org.t2.mesh_communication.config.Product;

public class ManifestTests {
    private static int nManifests;
    private static Set<Integer> devicesIds;

    @BeforeAll
    static void init() {
        nManifests = 3;
        devicesIds = new HashSet<>();
        devicesIds.add(1);
        devicesIds.add(2);
        devicesIds.add(3);
        devicesIds.add(4);
        devicesIds.add(5);
    }

    @Test
    public void testGenerateManifests() {
        // generated products
        ManifestGenerator generator = new ManifestGenerator(nManifests, devicesIds);
        assertDoesNotThrow(() -> generator.generate());

        // read products from file
        HashMap<Integer, Integer> products = getProductsFromFile();

        // test number of products
        assertEquals(nManifests, products.size());

        // test correct IDs
        for (int id : products.keySet()) {
            assertTrue(devicesIds.contains(id));
        }

        // test quantities
        for (int qnt : products.values()) {
            assertTrue(0 <= qnt && qnt <= ManifestGenerator.MAX_QNT);
        }
    }

    @Test
    public void testReadManifests() {
        String manifestFile = "1;10\n2;50\n";

        InputStream inputStream =
                new ByteArrayInputStream(manifestFile.getBytes(StandardCharsets.UTF_8));
        ManifestReader reader = new ManifestReader(inputStream);
        try {
            reader.read();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        List<Product> products = reader.getProducts();

        // test number of devices
        assertEquals(2, products.size());

        // test products
        assertEquals(new Product(1, 10), products.get(0));
        assertEquals(new Product(2, 50), products.get(1));
    }

    private HashMap<Integer, Integer> getProductsFromFile() {
        Scanner scanner = null;
        try {
            scanner = new Scanner(new File(ManifestGenerator.FILE_DIR + ManifestGenerator.FILE));
        } catch (FileNotFoundException e) {
            Assertions.fail();
        }

        HashMap<Integer, Integer> products = new HashMap<>();
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            String[] contents = line.split(SEPARATOR);
            if (contents.length != 2) throw new InputMismatchException();

            int id = Integer.parseInt(contents[0]);
            int qnt = Integer.parseInt(contents[1]);
            products.put(id, qnt);
        }
        return products;
    }
}
