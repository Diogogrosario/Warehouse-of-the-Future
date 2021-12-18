package org.t2.mesh_communication;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Objects;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.t2.mesh_communication.config.Product;

public class ProductTests {
    public static Product product;

    @BeforeAll
    static void init() {
        product = new Product(1, 10);
    }

    @Test
    void isProductTest() {
        Product fake = new Product(2, 10);
        assertNotEquals(fake, product);

        Product real = product;
        assertEquals(real, product);

        Product copy = new Product(1, 10);
        assertEquals(copy, product);

        copy = null;
        assertFalse(product.equals(copy));

        assertEquals(Objects.hash(1, 10), product.hashCode());
    }
}
