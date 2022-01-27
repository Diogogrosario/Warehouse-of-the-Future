package org.t2.mesh_communication.log;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Set;
import java.util.logging.FileHandler;
import java.util.logging.Level;
import java.util.logging.LogRecord;
import java.util.logging.StreamHandler;
import java.util.stream.Collectors;

public class Logger {
    private static final String LOGFILE = "el_log.json";

    private static volatile Logger instance;
    private final HashMap<Integer, List<LogRecord>> history;
    private List<StreamHandler> loggers;
    private int tick;

    private Logger() {
        this.tick = 0;
        this.history = new HashMap<>();
        this.history.put(this.tick, new ArrayList<>());
        this.loggers = new ArrayList<>();

        StreamHandler handler = new StreamHandler(System.out, new ConsoleFormatter());
        handler.setLevel(Level.ALL);
        this.loggers.add(handler);

        try {
            FileHandler fileHandler = new FileHandler(Logger.LOGFILE);
            fileHandler.setLevel(Level.ALL);
            fileHandler.setFormatter(new JSONFormatter());
            this.loggers.add(fileHandler);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static Logger getInstance() {
        Logger ret = Logger.instance;
        if (ret != null) return ret;
        synchronized (Logger.class) {
            if (Logger.instance == null) {
                Logger.instance = new Logger();
            }
            return Logger.instance;
        }
    }

    public synchronized void addHandler(StreamHandler handler) {
        this.loggers.add(handler);
    }

    public synchronized void setHandlers(List<StreamHandler> handlers) {
        this.loggers = handlers;
    }

    public synchronized int getTick() {
        return tick;
    }

    public synchronized void nextTick() {
        ++this.tick;
        this.history.put(this.tick, new ArrayList<>());
    }

    public synchronized void publish(LogRecord record) {
        record.setSequenceNumber(this.tick);
        this.history.get(this.tick).add(record);
        for (StreamHandler handler : this.loggers) {
            handler.publish(record);
            handler.flush();
        }
    }

    public synchronized HashMap<Integer, List<LogRecord>> getHistory() {
        return this.history;
    }

    public synchronized List<LogRecord> getCurrentHistory() {
        return this.history.get(this.tick);
    }

    public synchronized List<LogRecord> getHistory(int tick) {
        return this.history.get(tick);
    }

    public synchronized void cleanHistory() {
        this.history.clear();
    }

    public synchronized void resetLogger() {
        this.cleanHistory();
        this.tick = 0;
        this.history.put(this.tick, new ArrayList<>());
    }

    public void resetToTick(int tick) {
        this.tick = tick;

        // remove old ticks from history
        Set<Integer> oldTicks =
                this.history.keySet().stream()
                        .filter(key -> key > tick)
                        .collect(Collectors.toSet());

        for (int t : oldTicks) history.remove(t);
    }
}
