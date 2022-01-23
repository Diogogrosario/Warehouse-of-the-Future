import React from "react";
import { Card, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import BatteryChart from "./BatteryChart";

export default function Device(): React.ReactElement {
	return (
		<div>
			<Stack direction="column" spacing={1}>
				<Typography variant="h5">Mesh Device</Typography>

				<Typography variant="body1">ID: 123456</Typography>

				<Typography variant="h5" sx={{ mb: 2 }}>
					Battery
				</Typography>

				<BatteryChart width={800} height={500} />
			</Stack>
		</div>
	);
}
