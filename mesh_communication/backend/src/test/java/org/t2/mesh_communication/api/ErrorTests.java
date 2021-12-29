package org.t2.mesh_communication.api;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.http.HttpHeaders.USER_AGENT;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.reactive.server.WebTestClient;
import org.t2.mesh_communication.API;
import org.t2.mesh_communication.Main;
import org.t2.mesh_communication.devices.MeshGrid;

public class ErrorTests {
    private static API api;
    @Autowired private WebTestClient webTestClient;

    @BeforeAll
    public static void init() {
        api = new API();
        Main main = new Main();
        MeshGrid mg = Mockito.mock(MeshGrid.class);
        main.setMeshGrid(mg);
        api.setMain(main);

        new Thread(() -> api.start()).start();
    }

    /* Test 404 endpoint */
    @Test
    public void errorTest() {
        // Create connection
        HttpURLConnection con = null;
        try {
            con = (HttpURLConnection) new URL("http://0.0.0.0:8080/no_endpoint").openConnection();
            con.setRequestMethod("GET");
        } catch (IOException e) {
            Assertions.fail();
        }
        con.setRequestProperty("User-Agent", USER_AGENT);

        // Get response
        int responseCode = 0;
        String response = null;
        try {
            responseCode = con.getResponseCode();
        } catch (IOException e) {
            Assertions.fail();
        }

        assertEquals(404, responseCode);
        Assertions.assertThrows(FileNotFoundException.class, con::getContent);
    }
}
