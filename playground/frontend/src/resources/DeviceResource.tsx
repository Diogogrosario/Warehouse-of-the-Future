import { Resource } from "@rest-hooks/rest";

export class DeviceResource extends Resource {
	readonly id: string = "0000";

	static urlRoot = "http://localhost:3001/device";

	pk() {
		return this.id;
	}
}
