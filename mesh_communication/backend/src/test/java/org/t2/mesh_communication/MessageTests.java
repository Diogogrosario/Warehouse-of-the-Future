package org.t2.mesh_communication;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.t2.mesh_communication.devices.messages.Message;
import org.t2.mesh_communication.devices.messages.RequestMessage;

public class MessageTests {
    // Test message data class
    @Test
    public void messageTest() {
        Message tmp_message = new RequestMessage(1, 2, 3, "content");
        Message message = new RequestMessage(tmp_message);

        // Test paths
        assertEquals(true, message.addPath(1));
        assertEquals(false, message.addPath(1));
        assertEquals(true, message.addPath(2));
        assertEquals(2, message.getLastHop());

        assertEquals(true, message.isInPath(1));
        assertEquals(true, message.isInPath(2));
        assertEquals(false, message.isInPath(4));
        assertEquals(2, message.getPath().size());

        // Test data members
        assertEquals(1, message.getSource());
        assertEquals(2, message.getSeq());
        assertEquals(3, message.getDestination());
        assertEquals("content", message.getContent());
    }
}
