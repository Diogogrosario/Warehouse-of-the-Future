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

	// TODO: try and solve this problem
	// needs to connect to the "solved" api endpoint
	// static solved<T extends typeof Resource>(this: T) {
	// 	const endpoint = this.update();
	// 	return endpoint.extend({
	// 	  url({ id }: { id: number }) { return `/${id}/solved` },
	// 	  fetch({ id }: { id: number }) {
	// 		return endpoint.fetch(this, {id});
	// 	  }
	// 	});
	// }
}
