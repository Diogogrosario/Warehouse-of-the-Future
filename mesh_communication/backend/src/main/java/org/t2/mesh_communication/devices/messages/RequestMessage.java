package org.t2.mesh_communication.devices.messages;

/* Message used on a request. */
public class RequestMessage extends Message {
    public static final String type = "REQ";

    public RequestMessage(int source, int seq, int destination, String content) {
        super(source, seq, destination, content);
    }

    public RequestMessage(Message message) {
        super(message);
    }

    @Override
    public String getType() {
        return type;
    }
}
