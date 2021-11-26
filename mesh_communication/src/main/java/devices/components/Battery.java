package devices.components;

public class Battery extends Component {
    private final int totalBattery;
    private int remainingBattery;

    public Battery(int totalBattery, int idleConsumption) {
        super(idleConsumption);
        this.totalBattery = totalBattery;
        this.remainingBattery = totalBattery;
    }

    public void batteryRecharge() {
        this.remainingBattery = this.totalBattery;
    }

    public int getRemainingBattery() {
        return this.remainingBattery;
    }

    public void spendBattery(int batToSpend) {
        this.remainingBattery -= batToSpend;
    }

    @Override
    public String toString() {
        return "Battery{" +
                "\nTotal Battery: " + totalBattery +
                "\nRemaining Battery: " + remainingBattery +
                "\nIdle Consumption: " + idleConsumption +
                "\n}";
    }
}