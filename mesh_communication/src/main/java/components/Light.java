package components;

public class Light {
    private String color;
    private boolean isOn;

    public Light() {
        this.isOn = false;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public boolean isOn() {
        return isOn;
    }

    public void setOn(boolean on) {
        isOn = on;
    }

    @Override
    public String toString() {
        return "Light{" +
                "\nColor: " + color +
                "\nIs On: " + isOn +
                "\n}";
    }
}
