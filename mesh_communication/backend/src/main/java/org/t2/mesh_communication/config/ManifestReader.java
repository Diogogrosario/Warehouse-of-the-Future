package org.t2.mesh_communication.config;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.InputMismatchException;
import java.util.List;
import java.util.Scanner;
import org.t2.mesh_communication.devices.Position;

public class ManifestReader {
    public static final String FILE_DIR = "files/";

    private List<Product> products;

    public ManifestReader(InputStream inputStream) {
        Scanner reader = new Scanner(inputStream);
        this.products = new ArrayList<>();

        while (reader.hasNextLine()) {
            String line = reader.nextLine();
            String[] contents = line.split(";");
            if (contents.length != 4) throw new InputMismatchException();

            int id = Integer.parseInt(contents[0]);
            int x = Integer.parseInt(contents[1]), y = Integer.parseInt(contents[2]);
            Position pos = new Position(x, y);
            int quantity = Integer.parseInt(contents[3]);

            products.add(new Product(id, pos, quantity));
        }
    }

    public ManifestReader(String manifestFileName) throws FileNotFoundException {
        this(new FileInputStream(FILE_DIR + manifestFileName));
    }

    public List<Product> getProducts() {
        return products;
    }
}
