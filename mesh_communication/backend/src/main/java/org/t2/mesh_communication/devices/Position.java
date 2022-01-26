package org.t2.mesh_communication.devices;

import java.io.Serializable;
import java.util.List;
import java.util.Objects;

/** Represents the Position of a device. */
public class Position implements Serializable {
    protected int x;
    protected int y;
    protected int z;

    public Position(int x, int y) {
        this(x, y, 0);
    }

    public Position(int x, int y, int z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public Position(List<Integer> coords) {
        this(coords.get(0), coords.get(1), coords.get(2));
    }

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }

    public int getZ() {
        return z;
    }

    public void setX(int x) {
        this.x = x;
    }

    public void setY(int y) {
        this.y = y;
    }

    public void setZ(int z) {
        this.z = z;
    }

    public boolean inRange(Position p2, float range) {
        return Math.sqrt(
                        Math.pow(this.x - p2.x, 2)
                                + Math.pow(this.y - p2.y, 2)
                                + Math.pow(this.z - p2.z, 2))
                <= range;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Position position = (Position) o;
        return x == position.x && y == position.y && z == position.z;
    }

    @Override
    public int hashCode() {
        return Objects.hash(x, y, z);
    }

    @Override
    public String toString() {
        return String.format("{x: %d; y: %d; z: %d}", this.x, this.y, this.z);
    }

    public String toJson() {
        return String.format("{\"x\":%d,\"y\":%d,\"z\":%d}", this.x, this.y, this.z);
    }
}
