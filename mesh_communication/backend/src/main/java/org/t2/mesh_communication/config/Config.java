package org.t2.mesh_communication.config;

public class Config {
    private static Config instance;

    public int orchestratorId;
    public int orchestratorRange;

    public int totalBattery;
    public int batIdleConsumption;

    public int screenIdleConsumption;
    public int screenOnConsumption;

    public int receivingConsumption;
    public int sendingConsumption;

    public int deviceRange;
    public int timeToLive;

    public int messageFailure;

    private Config() {
        Config.instance = this;
    }

    public static Config getInstance() {
        if (Config.instance == null) new Config();
        return Config.instance;
    }

    @Override
    public String toString() {
        return "orchestratorId: "
                + orchestratorId
                + "\norchestratorRange: "
                + orchestratorRange
                + "\ntotalBattery: "
                + totalBattery
                + "\nbatIdleConsumption: "
                + batIdleConsumption
                + "\nscreenIdleConsumption: "
                + screenIdleConsumption
                + "\nscreenOnConsumption: "
                + screenOnConsumption
                + "\nreceivingConsumption: "
                + receivingConsumption
                + "\nsendingConsumption: "
                + sendingConsumption
                + "\ndeviceRange: "
                + deviceRange
                + "\ntimeToLive: "
                + timeToLive
                + "\nmessageFailure: "
                + messageFailure;
    }
}
