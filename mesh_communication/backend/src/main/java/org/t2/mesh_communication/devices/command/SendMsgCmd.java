package org.t2.mesh_communication.devices.command;

import java.io.Serializable;
import org.t2.mesh_communication.devices.MeshDevice;
import org.t2.mesh_communication.devices.messages.Message;
import org.t2.mesh_communication.devices.messages.ReplyMessage;
import org.t2.mesh_communication.devices.messages.RequestMessage;

public class SendMsgCmd implements Command, Serializable {
    private final MeshDevice meshDevice;
    private final Message message;

    public SendMsgCmd(MeshDevice md, Message msg) {
        this.meshDevice = md;
        this.message = msg;
    }

    @Override
    public void execute() {
        Message m;
        String msg_type = this.message.getType();
        switch (msg_type) {
            case RequestMessage.type:
                m = new RequestMessage(this.message);
                break;
            case ReplyMessage.type:
                m = new ReplyMessage(this.message);
                break;
            default:
                return;
        }

        this.meshDevice.sendMessage(m);
    }

    public Message getMessage() {
        return message;
    }
}
