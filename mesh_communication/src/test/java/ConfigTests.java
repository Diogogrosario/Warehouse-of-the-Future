import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory;
import components.Battery;
import config.Config;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class ConfigTests {
    @BeforeAll
    private static void instantiateConfig() {
        ObjectMapper om = new ObjectMapper(new YAMLFactory());

        try {
            om.readValue(
                    ConfigTests.class.getClassLoader()
                            .getResourceAsStream("mesh.yaml"),
                    Config.class);
        } catch (IOException e) {
            Assertions.fail();
        }
    }

    @Test
    void batteryFromConfig() {
        Config c = Config.getInstance();
        assertEquals("""
                Battery{
                Total Battery: 1000
                Remaining Battery: 1000
                Idle Consumption: 2
                }""", new Battery(c.totalBattery, c.batIdleConsumption).toString());
    }
}
