package org.t2.mesh_communication.log;

import java.util.logging.Level;
import java.util.logging.LogRecord;

public class Log extends LogRecord {
    public Log(String id, String msg) {
        super(Level.INFO, msg);
        this.setSourceClassName(id);
    }

    public Log(String id, String fstr, Object... args) {
        this(id, String.format(fstr, args));
    }
}
