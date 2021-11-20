import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        ManifestGenerator generator = new ManifestGenerator(3);
        try {
            generator.generate();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
