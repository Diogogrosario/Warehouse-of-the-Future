package org.t2.mesh_communication.config;

import static org.t2.mesh_communication.config.LayoutGenerator.FILE;
import static org.t2.mesh_communication.config.LayoutGenerator.FILE_DIR;
import static org.t2.mesh_communication.config.LayoutGenerator.FILE_SEPARATOR;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.*;
import org.t2.mesh_communication.devices.*;

/** Reads ids and positions from genereated layout file and stores them in a hashmap. */
public class LayoutReader {
    private InputStream inputStream;
    /** Where information read from the file is stored. Key: ID Value: Position */
    private HashMap<Integer, Position> devices;

    public LayoutReader() throws FileNotFoundException {
        this(new FileInputStream(FILE_DIR + FILE));
    }

    public LayoutReader(InputStream inputStream) {
        this.devices = new HashMap<>();
        this.inputStream = inputStream;
    }

    public void read() throws FileNotFoundException {
        Scanner reader = new Scanner(inputStream);

        while (reader.hasNextLine()) {
            String line = reader.nextLine();
            String[] contents = line.split(FILE_SEPARATOR);
            if (contents.length != 3) throw new InputMismatchException();

            int id = Integer.parseInt(contents[0]);
            int x = Integer.parseInt(contents[1]), y = Integer.parseInt(contents[2]);
            Position pos = new Position(x, y);
            devices.put(id, pos);
        }
    }

    public HashMap<Integer, Position> getDevices() {
        return devices;
    }
}
