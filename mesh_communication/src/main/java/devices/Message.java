package devices;

import java.util.HashSet;
import java.util.Set;

public class Message {
    private final int destination;
    private final String content;
    private final Set<Integer> path;

    public Message(int destination, String content) {
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
        return "Message{dest=" + this.destination + "; content=" + this.content + "}";
    }
}
