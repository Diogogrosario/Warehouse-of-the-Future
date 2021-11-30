import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

export default function ComponentCard(): React.ReactElement {
	return (
		<Card sx={{ display: "flex", mt: 5 }}>
			<CardMedia
				component="img"
				image={require("../assets/images/device.png").default}
				alt="Component Image"
			/>
			<CardContent>
				<Typography variant="h5">Mesh Device</Typography>

				<Typography variant="body2">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum turpis dui,
					viverra non cursus eu, elementum sed erat. Donec non nulla tortor. Vivamus arcu
					libero, facilisis vel rhoncus vitae, porta et elit. Mauris quis nulla quam.
					Vivamus orci erat, venenatis id efficitur accumsan, blandit at est. Aenean sit
					amet vulputate sem. Curabitur elementum dapibus varius. Proin dapibus egestas
					dui vitae dapibus. Mauris tincidunt nisl eu faucibus posuere.
				</Typography>
			</CardContent>
		</Card>
	);
}
