import { Resource } from "@rest-hooks/rest";

export class ActionResource extends Resource {
	readonly id: number = 1;
	readonly description: string = "";
	readonly employee_id: string = "";
	readonly createdAt: Date = new Date();
	readonly updatedAt: Date = new Date();
	readonly reportId: number = 1;

	static urlRoot = "http://localhost:3001/action";

	pk() {
		return `${this.id}`;
	}
}
