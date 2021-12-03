import React from "react";
import DeviceCard from "./DeviceCard";
import { Grid } from "@mui/material";

export default function DeviceList(): React.ReactElement {
	const cards = [];

	for (let i = 0; i < 10; i++)
		cards.push(
			<Grid item key={i}>
				<DeviceCard />
			</Grid>
		);

	return (
		<Grid container justifyContent="flex-start" spacing={3} >
			{cards}
		</Grid>
	);
}

