import { DeviceProps } from "../components/device/Device";
import { DeviceLayout } from "../renderer/BucketFactory";
import { SentMessages, RecvMessages } from "../renderer/Device";


export class SimulationAPI {
	public static devices: DeviceProps[] = [];
	public static currentTick = 0;
	public static lastTickBatteryConsumption = 0;
	public static currentTickBatteryConsumption = 0;
	public static totalBatteryConsumption = 0;
	public static failed = 0;

	public static sentMessages: SentMessages = {};
	public static receiveMessages: RecvMessages = {};

	static updateCurrentDevices() {
		fetch("http://localhost:8080/devices")
			.then((response) => response.json())
			.then((result) => {
				if (this.devices.length == 0) {
					for (let i = 0; i < result.length; i++) {
						const device = result[i];

						device.battery_level = [device.battery_level];

						this.devices.push(device as DeviceProps);
					}
				} else {
					for (let i = 0; i < this.devices.length; i++) {
						this.devices?.[i].battery_level?.push(result[i].battery_level);

						if (this.devices[i].battery_level.length > 25)
							this.devices[i].battery_level.shift();
					}
				}
			});
	}

	static advanceTick() {
		const body = new FormData();
		body.append("n_ticks", "1");

		fetch("http://localhost:8080/tick/forwards", {
			method: "POST",
			body: body,
		})
			.then((response) => response)
			.then(() => {
				if (this.currentTick == 0) {
					this.orchestrate();
				}

				this.currentTick++;
				this.lastTickBatteryConsumption = this.currentTickBatteryConsumption;
				this.getCurrentMetrics();
				this.updateCurrentDevices();
				this.updateReceiveMessages();
				this.updateSendMessages();
			});
	}

	public static orchestrate() {
		fetch("http://localhost:8080/orchestrate", {
			method: "POST",
		})
			.then((response) => response);
			// .then((result) => console.log(result));
	}

	public static postLayout(layout: DeviceLayout) {
		fetch("http://localhost:8080/layout", {
			method: "POST",
			body: JSON.stringify(layout),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((response) => response)
		.then((result) => console.log(result));
	}

	static async getCurrentMetrics() {
		const result = await fetch("http://localhost:8080/metrics").then((response) =>
			response.json()
		);
		this.currentTickBatteryConsumption = result["batTick"];
		this.failed = result["failed"];
		this.totalBatteryConsumption = result["batCommunication"];
	}

	static updateSendMessages() {
		fetch("http://localhost:8080/messages/send")
			.then((response) => response.json())
			.then((result) => (this.sentMessages = result as SentMessages));
	}

	static updateReceiveMessages() {
		fetch("http://localhost:8080/messages/receive")
			.then((response) => response.json())
			.then((result) => (this.receiveMessages = result as RecvMessages));
	}

	static restart() {
		fetch("http://localhost:8080/restart", {
			method: "POST",
		})
			.then((response) => response)
			.then((result) => console.log(result));

		this.currentTick = 0;
		this.currentTickBatteryConsumption = 0;
		this.lastTickBatteryConsumption = 0;
		this.devices = [];
		this.totalBatteryConsumption = 0;
		this.failed = 0;
		this.sentMessages = {};
		this.receiveMessages = {};

		this.orchestrate();
	}
}
