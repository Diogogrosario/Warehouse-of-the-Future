import { Resource } from "@rest-hooks/rest";
import { ActionResource } from "./ActionResource";

export class ReportResource extends Resource {
	readonly id: number = 1;
	readonly severity: "warning" | "error" = "warning";
	readonly title: string = "";
	readonly description: string = "";
	readonly resolved: boolean = false;
	readonly createdAt: Date = new Date();
	readonly updatedAt: Date = new Date();
	readonly actions: ActionResource[] = [];

	static urlRoot = "http://localhost:3001/report";

	pk() {
		return `${this.id}`;
	}

	static getEndpointExtra() {
		return { pollFrequency: 5000 };
	}
}
