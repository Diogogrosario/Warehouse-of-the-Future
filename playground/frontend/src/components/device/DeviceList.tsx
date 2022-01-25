import React from "react";
import { List, ListItem } from "@mui/material";

import Device from "./Device";

import { SimulationAPI } from "../../resources/SimulationAPI";

export default function DeviceList(): React.ReactElement {
	return (
		<List style={{ overflow: "visible", height: "100%" }}>
			{SimulationAPI.devices
				.filter((device) => !device.orchestrator)
				.map((device) => (
					<ListItem key={device.id}>
						<Device
							id={device.id}
							battery_max={device.battery_max}
							battery_level={device.battery_level}
						/>
					</ListItem>
				))}
		</List>
	);
}
