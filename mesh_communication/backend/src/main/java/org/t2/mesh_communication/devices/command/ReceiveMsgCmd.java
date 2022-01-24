package org.t2.mesh_communication.devices.command;

import java.io.Serializable;
import java.util.Random;
import org.t2.mesh_communication.devices.MeshDevice;
import org.t2.mesh_communication.devices.messages.Message;

public class ReceiveMsgCmd implements Command, Serializable {
    /** Who will receive the message * */
    private final MeshDevice meshDevice;

    private final boolean fail;

    private final Message message;

    public ReceiveMsgCmd(MeshDevice md, Message msg, int messageFailure) {
        this.meshDevice = md;
        this.message = msg;
        Random random = new Random();
        this.fail = random.nextDouble() < (messageFailure / 100.0);
    }

    /** It's important to try to send the message before the next tick * */
    @Override
    public void execute() {
        if (!this.fail) this.meshDevice.receiveMessage(this.message);
    }

    public Message getMessage() {
        return message;
    }

    public boolean isFailed() {
        return fail;
    }
}
