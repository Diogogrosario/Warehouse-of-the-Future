export class SimulationAPI {
	public static devices = [];
	public static currentTick = 0;
	public static lastTickBatteryConsumption = 0;
	public static currentTickBatteryConsumption = 0;

	static getCurrentDevices() {
		fetch("http://localhost:8080/devices")
			.then((response) => response.json())
			.then((result) => {
				this.devices = result;
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
			.then((result) => console.log(result));

		if (this.currentTick == 0) {
			this.orchestrate();
		}

		this.currentTick++;
		this.lastTickBatteryConsumption = this.currentTickBatteryConsumption;
	}

	public static orchestrate() {
		fetch("http://localhost:8080/orchestrate", {
			method: "POST",
		})
			.then((response) => response)
			.then((result) => console.log(result));
	}

	static async getCurrentMetrics() {
		const result = await fetch("http://localhost:8080/metrics").then((response) =>
			response.json()
		);
		this.currentTickBatteryConsumption = result["batTick"];
	}

	static getSendMessages() {
		fetch("http://localhost:8080/messages/send")
			.then((response) => response.json())
			.then((result) => console.log(result));
	}

	static getReceiveMessages() {
		fetch("http://localhost:8080/messages/receive")
			.then((response) => response.json())
			.then((result) => console.log(result));
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

		this.orchestrate();
	}
}
