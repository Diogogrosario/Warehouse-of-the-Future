package config;

public class Config {
    private static Config instance;

    public int totalBattery;
    public int receivingConsumption;
    public int sendingConsumption;
    public int idleConsumption;

    private Config() {
        Config.instance = this;
    }

    public static Config getInstance() {
        if (Config.instance == null) new Config();
        return Config.instance;
    }

    @Override
    public String toString() {
        return "totalBattery: " + totalBattery +
                "\nreceivingConsumption: " + receivingConsumption +
                "\nsendingConsumption: " + sendingConsumption +
                "\nidleConsumption: " + idleConsumption;
    }
}
