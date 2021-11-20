import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class ManifestGeneratorTests {
    @Test
    public void testNumberOfManifests() {
        ManifestGenerator m = new ManifestGenerator(3);
        assertDoesNotThrow(m::generate);

        Scanner scanner = null;
        try {
            scanner = new Scanner(new File(ManifestGenerator.FILE_DIR + File.separator + m.getFileName()));
        } catch (FileNotFoundException e) {
            Assertions.fail();
        }

        int cnt = 0;
        while (scanner.hasNextLine()) {
            scanner.nextLine();
            cnt++;
        }

        assertEquals(3, cnt);
    }
}
