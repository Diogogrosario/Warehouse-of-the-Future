package org.t2.mesh_communication.devices.command;

import org.t2.mesh_communication.devices.MeshDevice;
import org.t2.mesh_communication.devices.messages.Message;

public class ReceiveMsgCmd implements Command {
    /** Who will receive the message * */
    private final MeshDevice meshDevice;

    private boolean failed;

    private final Message message;

    public ReceiveMsgCmd(MeshDevice md, Message msg) {
        this.meshDevice = md;
        this.message = msg;
        this.failed = false;
    }

    /** It's important to try to send the message before the next tick * */
    @Override
    public void execute() {
        this.failed = this.meshDevice.receiveMessage(this.message);
    }

    public Message getMessage() {
        return message;
    }

    public boolean isFailed() {
        return failed;
    }
}
