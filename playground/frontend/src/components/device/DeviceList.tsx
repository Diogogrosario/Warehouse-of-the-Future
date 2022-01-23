import React, { useEffect, useState } from "react";

import Device, { DeviceProps } from "./Device";
import { List, ListItem } from "@mui/material";

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
		<List sx={{ overflow: "auto" }}>
			{devices.map((device) => (
				<ListItem key={device.id}>
					<Device id={device.id} />
				</ListItem>
			))}
		</List>
	);
}

