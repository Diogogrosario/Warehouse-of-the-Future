package org.t2.mesh_communication;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory;
import java.io.IOException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.t2.mesh_communication.config.Config;
import org.t2.mesh_communication.devices.components.Battery;

public class ConfigTests {
    @BeforeAll
    private static void instantiateConfig() {
        ObjectMapper om = new ObjectMapper(new YAMLFactory());

        try {
            om.readValue(
                    ConfigTests.class.getClassLoader().getResourceAsStream("mesh.yaml"),
                    Config.class);
        } catch (IOException e) {
            Assertions.fail();
        }
    }

    @Test
    void batteryFromConfig() {
        Config c = Config.getInstance();
        assertEquals(
                """
                Battery{
                Total Battery: 1000
                Remaining Battery: 1000
                Idle Consumption: 2
                }""",
                new Battery(c.totalBattery, c.batIdleConsumption).toString());
    }
}
