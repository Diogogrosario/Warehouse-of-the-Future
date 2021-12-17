package org.t2.mesh_communication;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.t2.mesh_communication.config.Product;
import org.t2.mesh_communication.devices.Position;

import java.util.Objects;

import static org.junit.jupiter.api.Assertions.*;

public class ProductTests {
    public static Product product;

    @BeforeAll
    static void init() {
        Position pos = new Position(1, 1);
        product = new Product(1, pos, 10);
    }

    @Test
    void isProductTest() {
        Position pos = new Position(1, 1);
        Product fake = new Product(2, pos, 10);
        assertNotEquals(fake, product);

        Product real = product;
        assertEquals(real, product);

        Product copy = new Product(1, pos, 10);
        assertEquals(copy, product);

        copy = null;
        assertFalse(product.equals(copy));
        assertNotEquals(pos, product);

        assertEquals(Objects.hash(1, pos, 10), product.hashCode());
    }

    @Test
    void positionTest() {
        Position pos = new Position(1, 1);
        assertEquals(1, pos.getX());
        assertEquals(1, pos.getY());

        Position pos1 = new Position(1, 1);
        assertEquals(pos1, pos);

        pos1.setX(2);
        assertNotEquals(pos1, pos);

        pos1.setX(1);
        pos1.setY(2);
        assertNotEquals(pos1, pos);

        pos1.setX(5);
        assertFalse(pos.inRange(pos1, 1));
        assertTrue(pos.inRange(pos1, 5));

        pos1.setX(1);
        assertTrue(pos.inRange(pos1, 1));

        Position copy = pos;
        assertEquals(copy, pos);

        copy = null;
        assertNotEquals(copy, pos);

        assertEquals(Objects.hash(1, 1), pos.hashCode());
    }
}
