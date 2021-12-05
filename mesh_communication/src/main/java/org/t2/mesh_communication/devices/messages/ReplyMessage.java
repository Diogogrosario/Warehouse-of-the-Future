package org.t2.mesh_communication.devices.messages;

/** Message used to reply to a request message. */
public class ReplyMessage extends Message {
    public static final String type = "REP";

    public ReplyMessage(int source, int seq, int destination, String content) {
        super(source, seq, destination, content);
    }

    public ReplyMessage(Message message) {
        super(message);
    }

    @Override
    public String getType() {
        return type;
    }
}
