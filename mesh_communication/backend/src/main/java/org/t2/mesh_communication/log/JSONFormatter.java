package org.t2.mesh_communication.log;

import java.util.logging.Formatter;
import java.util.logging.Handler;
import java.util.logging.LogRecord;

public class JSONFormatter extends Formatter {
    @Override
    public String format(LogRecord logRecord) {
        return "\t{\n"
                + "\t\t\"device\": \""
                + logRecord.getSourceClassName()
                + "\",\n"
                + "\t\t\"event\": \""
                + logRecord.getMessage()
                + "\",\n"
                + "\t\t\"tick\": \""
                + logRecord.getSequenceNumber()
                + "\"\n\t},\n";
    }

    public String getHead(Handler h) {
        return "[\n";
    }

    public String getTail(Handler h) {
        return "]";
    }
}
