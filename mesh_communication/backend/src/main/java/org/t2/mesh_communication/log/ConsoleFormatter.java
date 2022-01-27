package org.t2.mesh_communication.log;

import java.util.logging.Formatter;
import java.util.logging.LogRecord;

public class ConsoleFormatter extends Formatter {
    @Override
    public String format(LogRecord logRecord) {
        return logRecord.getSourceClassName() + " - " + logRecord.getMessage() + "\n";
    }
}
