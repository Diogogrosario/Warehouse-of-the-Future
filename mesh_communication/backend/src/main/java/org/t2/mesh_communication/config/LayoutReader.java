package org.t2.mesh_communication.config;

import static org.t2.mesh_communication.config.LayoutGenerator.*;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.*;
import org.t2.mesh_communication.devices.Position;

/** Reads ids and positions from genereated layout file and stores them in a hashmap. */
public class LayoutReader {
    private final InputStream inputStream;
    /** Where information read from the file is stored. Key: ID Value: Position */
    private final HashMap<Integer, Position> devices;

    public LayoutReader() throws FileNotFoundException {
        this(new FileInputStream(FILE_DIR + FILE));
    }

    public LayoutReader(String layoutFile) throws FileNotFoundException {
        this(new FileInputStream(FILE_DIR + layoutFile));
    }

    public LayoutReader(InputStream inputStream) {
        this.devices = new HashMap<>();
        this.inputStream = inputStream;
    }

    public void read() throws FileNotFoundException {
        Scanner reader = new Scanner(inputStream);

        while (reader.hasNextLine()) {
            String line = reader.nextLine();
            String[] contents = line.split(SEPARATOR);
            if (contents.length != 3) throw new InputMismatchException();

            int id = Integer.parseInt(contents[0]);
            int x = Integer.parseInt(contents[1]), y = Integer.parseInt(contents[2]);
            Position pos = new Position(x, y);
            this.devices.put(id, pos);
        }
    }

    public HashMap<Integer, Position> getDevices() {
        return this.devices;
    }

    public void readJson(Map<String, Object> jsonObject) {

        for (Map.Entry<String, Object> entry : jsonObject.entrySet()) {
            String id = entry.getKey();
            ArrayList<Object> list = (ArrayList<Object>) entry.getValue();
            LinkedHashMap<Integer, Integer> map = (LinkedHashMap<Integer, Integer>) list.get(0);

            List<Integer> coords = new ArrayList<>();
            for (Map.Entry<Integer, Integer> innerEntry : map.entrySet()) {
                coords.add(innerEntry.getValue());
            }

            Position pos = new Position(coords);
            this.devices.put(Integer.valueOf(id), pos);
        }
    }
}
