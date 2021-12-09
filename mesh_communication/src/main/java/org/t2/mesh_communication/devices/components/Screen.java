package org.t2.mesh_communication.devices.components;

public class Screen extends Component {
    private boolean isOn;
    private final int onConsumption;

    public Screen(int idleConsumption, int onConsumption) {
        super(idleConsumption);
        this.onConsumption = onConsumption;
        this.isOn = false;
    }

    public boolean isOn() {
        return this.isOn;
    }

    public void setOn(boolean on) {
        this.isOn = on;
    }

    @Override
    public int getTickConsumption() {
        int ret = super.getTickConsumption();
        if (this.isOn) ret += this.onConsumption;
        return ret;
    }

    @Override
    public String toString() {
        return "Screen{" + "\nIs On: " + isOn + "\n}";
    }
}
