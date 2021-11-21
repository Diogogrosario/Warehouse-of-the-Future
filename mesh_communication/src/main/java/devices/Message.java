package devices;

import java.util.HashSet;
import java.util.Set;

public class Message {
    private final int source, destination;
    private final int seq;
    private final String content;
    private final Set<Integer> path;

    public Message(int source, int seq, int destination, String content) {
        this.source = source;
        this.seq = seq;
        this.destination = destination;
        this.content = content;
        this.path = new HashSet<>();
    }

    public boolean addPath(int id) {
        return this.path.add(id);
    }

    public boolean isInPath(int id) {
        return this.path.contains(id);
    }

    public int getDestination() {
        return destination;
    }

    public String getContent() {
        return content;
    }

    @Override
    public String toString() {
        return String.format("Message{source=%d; seq=%d; dest=%d; content=%s}",
                this.source, this.seq, this.destination, this.content);
    }
}
