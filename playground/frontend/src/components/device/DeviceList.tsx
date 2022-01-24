import React, { useEffect, useState } from "react";

import Device, { DeviceProps } from "./Device";
import { List, ListItem } from "@mui/material";
import { SimulationAPI } from "../../resources/SimulationAPI";

export default function DeviceList(): React.ReactElement {
	const [devices, setDevices] = useState<DeviceProps[]>(SimulationAPI.devices);

	return (
		<List style={{ overflow: "visible", height: "100%" }}>
			{devices.map((device) => (
				<ListItem key={device.id}>
					<Device id={device.id} />
				</ListItem>
			))}
		</List>
	);
}

