import { RepeatOneSharp } from "@mui/icons-material";

export function getCurrentDevices() {
	fetch("http://localhost:8080/devices")
		.then((response) => response.json())
		.then((result) => console.log(result));
}

export function advanceTick() {
	const body = new FormData();
	body.append("n_ticks", "1");

	fetch("http://localhost:8080/tick/forwards", {
		method: "POST",
		body: body,
	})
		.then((response) => response)
		.then((result) => console.log(result));
}

export function orchestrate() {
	fetch("http://localhost:8080/orchestrate", {
		method: "POST",
	})
		.then((response) => response)
		.then((result) => console.log(result));
}

export function getCurrentMetrics() {
	fetch("http://localhost:8080/metrics")
		.then((response) => response.json())
		.then((result) => console.log(result));
}

export function getSendMessages() {
	fetch("http://localhost:8080/messages/send")
		.then((response) => response.json())
		.then((result) => console.log(result));
}

export function getReceiveMessages() {
	fetch("http://localhost:8080/messages/receive")
		.then((response) => response.json())
		.then((result) => console.log(result))
}
