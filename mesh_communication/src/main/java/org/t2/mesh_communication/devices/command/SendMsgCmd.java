package org.t2.mesh_communication.devices.command;

import org.t2.mesh_communication.devices.MeshDevice;
import org.t2.mesh_communication.devices.Message;

public class SendMsgCmd implements Command {
    private final MeshDevice meshDevice;
    private final Message message;

    public SendMsgCmd(MeshDevice md, Message msg) {
        this.meshDevice = md;
        this.message = msg;
    }

    @Override
    public void execute() {
        Message m = new Message(this.message);
        this.meshDevice.sendMessage(m);
    }
}
