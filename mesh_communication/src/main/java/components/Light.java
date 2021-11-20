package components;

public class Light extends Component {
    private String color;
    private boolean isOn;
    private int onConsumption;

    public Light(int idleComsumption, int onConsumption, String color) {
        super(idleComsumption);
        this.onConsumption = onConsumption;
        this.color = color;
        this.isOn = false;
    }

    public Light(int idleComsumption, int onConsumption) {
        this(idleComsumption, onConsumption, "nocolor");
    }

    public String getColor() {
        return this.color;
    }

    public boolean isOn() {
        return this.isOn;
    }

    public void setOn(boolean on) {
        this.isOn = on;
    }

    @Override
    public int getTickComsumption() {
        int ret = super.getTickComsumption();
        if (this.isOn) ret += this.onConsumption;
        return ret;
    }

    @Override
    void update() {

    }

    @Override
    public String toString() {
        return "Light{" +
                "\nColor: " + color +
                "\nIs On: " + isOn +
                "\n}";
    }
}
