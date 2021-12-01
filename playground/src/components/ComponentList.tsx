import React from "react";
import ComponentCard from "./ComponentCard";
import { Grid } from "@mui/material";

function ComponentList(): React.ReactElement {
	const cards = [];

	for (let i = 0; i < 10; i++)
		cards.push(
			<Grid item>
				<ComponentCard />
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

export default ComponentList;
