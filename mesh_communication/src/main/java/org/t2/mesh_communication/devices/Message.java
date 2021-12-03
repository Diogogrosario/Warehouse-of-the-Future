package org.t2.mesh_communication.devices;

import java.util.HashSet;
import java.util.Set;

public class Message {
    /**
     * The source of the message.
     */
    private final int source;
    /**
     * The destination of the message.
     */
    private final int destination;
    /**
     * The sequence number of the message (unique for each source), and incremented for each new message.
     */
    private final int seq;
    /**
     * The content of the message.
     */
    private final String content;
    /**
     * The path of the message.
     */
    private final Set<Integer> path;
    /**
     * Last hop of the message (either source or last relay point).
     */
    private int lastHop;

    public Message(int source, int seq, int destination, String content) {
        this.source = source;
        this.seq = seq;
        this.destination = destination;
        this.content = content;
        this.path = new HashSet<>();
        this.lastHop = source;
    }

    public Message(Message message) {
        this.source = message.getSource();
        this.seq = message.getSeq();
        this.destination = message.getDestination();
        this.content = message.getContent();
        this.path = new HashSet<>(message.getPath());
    }

    public boolean addPath(int id) {
        if (this.path.add(id)) {
            this.lastHop = id;
            return true;
        }
        return false;
    }

    public boolean isInPath(int id) {
        return this.path.contains(id);
    }

    public int getSource() {
        return this.source;
    }

    public int getSeq() {
        return this.seq;
    }

    public int getDestination() {
        return destination;
    }

    public String getContent() {
        return content;
    }

    public int getLastHop() {
        return lastHop;
    }

    public Set<Integer> getPath() {
        return path;
    }

    @Override
    public String toString() {
        return String.format(
                "Message{source=%d; seq=%d; dest=%d; content=%s}",
                this.source, this.seq, this.destination, this.content);
    }
}
