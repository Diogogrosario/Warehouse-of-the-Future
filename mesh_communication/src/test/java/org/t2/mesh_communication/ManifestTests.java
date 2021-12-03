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
import java.util.List;
import java.util.Scanner;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class ManifestTests {
    @Test
    public void testGenerateManifests() {
        ManifestGenerator m = new ManifestGenerator(3);
        assertDoesNotThrow(m::generate);

        Scanner scanner = null;
        try {
            scanner =
                    new Scanner(
                            new File(ManifestReader.FILE_DIR + File.separator + m.getFileName()));
        } catch (FileNotFoundException e) {
            Assertions.fail();
        }

        // Count if number of lines is equal to the number of requested manifests
        int cnt = 0;
        while (scanner.hasNextLine()) {
            scanner.nextLine();
            cnt++;
        }

        assertEquals(3, cnt);
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
