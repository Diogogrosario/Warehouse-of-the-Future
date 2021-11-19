import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory;
import components.Battery;
import org.junit.jupiter.api.Test;

import java.io.File;
import java.io.IOException;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class BatteryTests {

    @Test
    void createBattery() {
        File file = new File("src/test/resources/mesh.yaml");

        ObjectMapper om = new ObjectMapper(new YAMLFactory());

        Battery battery = null;
        try {
            battery = om.readValue(file, Battery.class);
        } catch (IOException e) {
            e.printStackTrace();
        }

        assertEquals("Battery{" +
                "\nTotal Battery: 1000" +
                "\nRemaining Battery: 1000" +
                "\nSending Message Consumption: 30" +
                "\nReceiving Message Consumption: 20" +
                "\nIdle Consumption: 2" +
                "\nLight Consumption: 3" +

                "\n}", battery.toString());

    }
}
