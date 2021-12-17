package org.t2.mesh_communication.config;

import org.t2.mesh_communication.devices.Position;

import java.util.Objects;

public class Product {
    private final int id;
    private final Position position;
    private final int quantity;

    public Product(int id, Position position, int quantity) {
        this.id = id;
        this.position = position;
        this.quantity = quantity;
    }

    public int getId() {
        return id;
    }

    public Position getPosition() {
        return position;
    }

    public int getQuantity() {
        return quantity;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Product product = (Product) o;
        return id == product.id
                && quantity == product.quantity
                && position.equals(product.position);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, position, quantity);
    }
}
