package components;

import java.util.List;

public class Battery extends Component {
    private int totalBattery;
    private int remainingBattery;
    private int sendingConsumption;
    private int receivingConsumption;
    private int idleConsumption;
    private int lightConsumption;
    private List<Light> lights;

    public Battery() {
    }

    public Battery(int totalBattery, int sendingConsumption, int receivingConsumption, int idleConsumption, int lightConsumption) {
        this.totalBattery = totalBattery;
        this.remainingBattery = totalBattery;
        this.sendingConsumption = sendingConsumption;
        this.receivingConsumption = receivingConsumption;
        this.idleConsumption = idleConsumption;
        this.lightConsumption = lightConsumption;

    }

    public void setTotalBattery(int totalBattery) {
        this.totalBattery = totalBattery;
        this.remainingBattery = totalBattery;
    }

    public void setSendingConsumption(int sendingConsumption) {
        this.sendingConsumption = sendingConsumption;
    }

    public void setReceivingConsumption(int receivingConsumption) {
        this.receivingConsumption = receivingConsumption;
    }

    public void setIdleConsumption(int idleConsumption) {
        this.idleConsumption = idleConsumption;
    }

    public void setLightConsumption(int lightConsumption) {
        this.lightConsumption = lightConsumption;
    }

    public void setLights(List<Light> lights) {
        this.lights = lights;
    }

    public void batteryRenewal() {
        this.remainingBattery = totalBattery;
    }

    public int getRemainingBattery() {
        return this.remainingBattery;
    }

    public void setRemainingBattery(int remainingBattery) {
        this.remainingBattery = remainingBattery;
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
                "\nLight Consumption: " + lightConsumption +
                "\n}";
    }
}
