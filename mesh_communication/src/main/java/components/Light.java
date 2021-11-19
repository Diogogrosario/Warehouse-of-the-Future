package components;

public class Light {
    private String color;
    private boolean isOn;


    public Light() {
    }

    public void setColor(String color) {
        this.color = color;
    }

    public void setOn(boolean on) {
        isOn = on;
    }

    public String getColor() {
        return color;
    }

    public boolean isOn() {
        return isOn;
    }

    @Override
    public String toString() {
        return "Light{" +
                "\nColor: " + color +
                "\nIs On: " + isOn +
                "\n}";
    }
}
