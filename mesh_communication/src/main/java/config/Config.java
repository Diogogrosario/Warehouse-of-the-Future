package config;

public class Config {
    private static Config instance;

    public int totalBattery;
    public int batIdleConsumption;

    public int lightIdleConsumption;
    public int lightOnConsumption;

    public int receivingConsumption;
    public int sendingConsumption;

    private Config() {
        Config.instance = this;
    }

    public static Config getInstance() {
        if (Config.instance == null) new Config();
        return Config.instance;
    }

    @Override
    public String toString() {
        return "totalBattery: "
                + totalBattery
                + "\nbatIdleConsumption: "
                + batIdleConsumption
                + "\nlightIdleConsumption: "
                + lightIdleConsumption
                + "\nlightOnConsumption: "
                + lightOnConsumption
                + "\nreceivingConsumption: "
                + receivingConsumption
                + "\nsendingConsumption: "
                + sendingConsumption;
    }
}
