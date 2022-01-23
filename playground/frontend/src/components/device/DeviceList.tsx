import React from "react";
import Device from "./Device";
import { List, ListItem } from "@mui/material";

export default function DeviceList(): React.ReactElement {
	const cards = [];

	for (let i = 0; i < 5; i++)
		cards.push(
			<ListItem key={i}>
				<Device />
			</ListItem>
		);

	return <List sx={{ overflow: "auto" }}>{cards}</List>;
}

