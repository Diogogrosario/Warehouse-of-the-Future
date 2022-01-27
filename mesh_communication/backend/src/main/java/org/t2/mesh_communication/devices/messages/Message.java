package org.t2.mesh_communication.devices.messages;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/** Messages distribute in the mesh network. */
public abstract class Message implements Serializable {
    /** The source of the message. */
    private final int source;
    /** The destination of the message. */
    private final int destination;
    /**
     * The sequence number of the message (unique for each source), and incremented for each new
     * message.
     */
    private final int seq;
    /** The content of the message. */
    private final String content;
    /** The path of the message. */
    private final Set<Integer> path;
    /** Last hop of the message (either source or last relay point). */
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
        this.lastHop = message.getLastHop();
    }

    /**
     * Add a node to the traveled path.
     *
     * @param id Node to add to the path.
     * @return True, if the node wasn't part of the path. False, otherwise.
     */
    public boolean addPath(int id) {
        if (this.path.add(id)) {
            this.lastHop = id;
            return true;
        }
        return false;
    }

    /**
     * Checks if a given node is in the path.
     *
     * @param id Node to search for.
     * @return True, if the node is in the path. False, otherwise.
     */
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

    public abstract String getType();

    public String toJson() {
        return String.format("{\"final\": %d}", this.destination);
    }
}
