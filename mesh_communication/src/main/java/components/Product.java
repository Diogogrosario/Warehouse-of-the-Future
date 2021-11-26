package components;

import devices.Position;

import java.util.Objects;

public class Product {
    private int id;
    private Position position;
    private int quantity;

    public Product(int id, Position position, int quantity) {
        this.id = id;
        this.position = position;
        this.quantity = quantity;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Product product = (Product) o;
        return id == product.id && quantity == product.quantity && position.equals(product.position);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, position, quantity);
    }
}
