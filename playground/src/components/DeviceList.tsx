import React from "react";
import DeviceCard from "./DeviceCard";
import { Grid } from "@mui/material";

function DeviceList(): React.ReactElement {
	const cards = [];

	for (let i = 0; i < 10; i++)
		cards.push(
			<Grid item key={i}>
				<DeviceCard />
			</Grid>,
		);

	return (
		<Grid
			container
			justifyContent="flex-start"
			spacing={3}
			sx={{ backgroundColor: "red"}}
		>
			{cards}
		</Grid>
	);
}

export default DeviceList;
