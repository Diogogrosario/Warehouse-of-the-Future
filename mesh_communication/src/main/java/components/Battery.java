package components;

public class Battery extends Component {
    private int totalBattery;
    private int remainingBattery;
    private int sendingConsumption;
    private int receivingConsumption;
    private int idleConsumptionOn;
    private int idleConsumptionOff;
    private boolean isOn;

    public Battery() {
    }

    public Battery(int totalBattery, int sendingConsumption, int receivingConsumption, int idleConsumptionOn, int idleConsumptionOff) {
        this.totalBattery = totalBattery;
        this.remainingBattery = totalBattery;
        this.sendingConsumption = sendingConsumption;
        this.receivingConsumption = receivingConsumption;
        this.idleConsumptionOn = idleConsumptionOn;
        this.idleConsumptionOff = idleConsumptionOff;
        this.isOn=false;
    }
    public void setTotalBattery(int totalBattery) {
        this.totalBattery = totalBattery;
        this.remainingBattery = totalBattery;
    }

    public void setRemainingBattery(int remainingBattery) {
        this.remainingBattery = remainingBattery;
    }

    public void setSendingConsumption(int sendingConsumption) {
        this.sendingConsumption = sendingConsumption;
    }

    public void setReceivingConsumption(int receivingConsumption) {
        this.receivingConsumption = receivingConsumption;
    }

    public void setIdleConsumptionOn(int idleConsumptionOn) {
        this.idleConsumptionOn = idleConsumptionOn;
    }

    public void setIdleConsumptionOff(int idleConsumptionOff) {
        this.idleConsumptionOff = idleConsumptionOff;
    }

    public void setOn(boolean on) {
        isOn = on;
    }
    public void batteryRenewal(){
        this.remainingBattery = totalBattery;
    }
    public void switchOnOff(){
        this.isOn=!this.isOn;
    }

    public int getRemainingBattery(){
        return this.remainingBattery;
    }

    @Override
    public void update(){
        if(this.isOn)
            this.remainingBattery-=this.idleConsumptionOn;
        else
            this.remainingBattery-=this.idleConsumptionOff;
    }
    @Override
    public void sentMessage(){
        this.remainingBattery-=this.sendingConsumption;
    }
    @Override
    public void receivedMessage(){
        this.remainingBattery-=this.receivingConsumption;
    }

    @Override
    public String toString() {
        return "Battery{" +
                "\nTotal Battery: " + totalBattery +
                "\nRemaining Battery: " + remainingBattery +
                "\nSending Message Consumption: " + sendingConsumption +
                "\nReceiving Message Consumption: " + receivingConsumption +
                "\nIdle Consumption while On: " + idleConsumptionOn +
                "\nIdle Consumption while Off: " + idleConsumptionOff +
                "\nIs On: " + isOn +
                "\n}";
    }
}
