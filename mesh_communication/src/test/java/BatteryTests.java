import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory;
import components.Battery;
import config.Config;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class BatteryTests {
    @Test
    void createBatteryFromConfig() {
        ObjectMapper om = new ObjectMapper(new YAMLFactory());

        Config config = null;
        try {
            config = om.readValue(getClass().getClassLoader().getResourceAsStream("mesh.yaml"),
                    Config.class);
        } catch (IOException e) {
            Assertions.fail();
        }

        assertEquals("Battery{" +
                "\nTotal Battery: 1000" +
                "\nRemaining Battery: 1000" +
                "\nSending Message Consumption: 30" +
                "\nReceiving Message Consumption: 20" +
                "\nIdle Consumption: 2" +
                "\n}", new Battery(config.totalBattery,
                config.receivingConsumption,
                config.sendingConsumption,
                config.idleConsumption).toString());
    }
}
