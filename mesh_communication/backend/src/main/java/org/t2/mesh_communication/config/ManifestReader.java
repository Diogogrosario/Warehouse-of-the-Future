package org.t2.mesh_communication.config;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.InputMismatchException;
import java.util.List;
import java.util.Scanner;

public class ManifestReader {
    private final List<Product> products;
    private final InputStream inputStream;

    public ManifestReader() throws FileNotFoundException {
        this(new FileInputStream(ManifestGenerator.FILE_DIR + ManifestGenerator.FILE));
    }

    public ManifestReader(String file) throws FileNotFoundException {
        this(new FileInputStream(ManifestGenerator.FILE_DIR + file));
    }

    public ManifestReader(InputStream inputStream) {
        this.products = new ArrayList<>();
        this.inputStream = inputStream;
    }

    public void read() throws FileNotFoundException {
        Scanner reader = new Scanner(inputStream);

        while (reader.hasNextLine()) {
            String line = reader.nextLine();
            String[] contents = line.split(ManifestGenerator.FILE_SEPARATOR);
            if (contents.length != 2) throw new InputMismatchException();

            int id = Integer.parseInt(contents[0]);
            int qnt = Integer.parseInt(contents[1]);

            products.add(new Product(id, qnt));
        }
    }

    public List<Product> getProducts() {
        return products;
    }
}
