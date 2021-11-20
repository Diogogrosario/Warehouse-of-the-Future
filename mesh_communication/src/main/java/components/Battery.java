package components;

import java.util.ArrayList;
import java.util.List;

public class Battery extends Component {
    private final int totalBattery;
    private final int receivingConsumption;
    private final int sendingConsumption;
    private final List<Light> lights;

    private int remainingBattery;

    public Battery(int totalBattery,
                   int receivingConsumption,
                   int sendingConsumption,
                   int idleConsumption) {
        super(idleConsumption);
        this.lights = new ArrayList<>();

        this.sendingConsumption = sendingConsumption;
        this.receivingConsumption = receivingConsumption;

        this.totalBattery = totalBattery;
        this.remainingBattery = totalBattery;
    }

    public void addLight(Light l) {
        this.lights.add(l);
    }

    public void addLights(List<Light> ls) {
        this.lights.addAll(ls);
    }

    public void batteryRecharge() {
        this.remainingBattery = this.totalBattery;
    }

    public int getRemainingBattery() {
        return this.remainingBattery;
    }

    @Override
    public void update() {
    }

    @Override
    public void sentMessage() {
        this.remainingBattery -= this.sendingConsumption;
    }

    @Override
    public void receivedMessage() {
        this.remainingBattery -= this.receivingConsumption;
    }

    @Override
    public String toString() {
        return "Battery{" +
                "\nTotal Battery: " + totalBattery +
                "\nRemaining Battery: " + remainingBattery +
                "\nSending Message Consumption: " + sendingConsumption +
                "\nReceiving Message Consumption: " + receivingConsumption +
                "\nIdle Consumption: " + idleConsumption +
                "\n}";
    }
}