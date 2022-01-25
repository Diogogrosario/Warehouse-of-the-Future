import React, { useEffect, useState } from "react";
import { List, ListItem } from "@mui/material";

import Device, { DeviceProps } from "./Device";

export default function DeviceList(): React.ReactElement {
	const [devices, setDevices] = useState<DeviceProps[]>([]);

	useEffect(() => {
		fetch("http://localhost:8080/devices")
			.then((response) => response.json())
			.then((result) => {
				setDevices(result);
			});
	}, []);

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
