package config;

public class Config {
    public int totalBattery;
    public int receivingConsumption;
    public int sendingConsumption;
    public int idleConsumption;

    public Config() {
    }

    public Config(
            int totalBattery,
            int receivingConsumption,
            int sendingConsumption,
            int idleConsumption
    ) {
        this.totalBattery = totalBattery;
        this.receivingConsumption = receivingConsumption;
        this.sendingConsumption = sendingConsumption;
        this.idleConsumption = idleConsumption;
    }

    @Override
    public String toString() {
        return "totalBattery: " + totalBattery +
                "\nreceivingConsumption: " + receivingConsumption +
                "\nsendingConsumption: " + sendingConsumption +
                "\nidleConsumption: " + idleConsumption;
    }
}
