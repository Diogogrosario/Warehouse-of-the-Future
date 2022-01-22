import React, { useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import BatteryChart from "./BatteryChart";

export default function DeviceDetails(): React.ReactElement {
	const [turnedOn, setTurnedOn] = useState(false);

	return (
		<Grid container sx={{ p: 3 }}>
			<Grid item xs={3}>
				<div style={{ textAlign: "center" }}>
					<img
						height={400}
						src={require("../assets/images/device.png").default}
						alt="DeviceDetails Image"
					/>
				</div>

				<Typography variant="h5">Mesh Device</Typography>

				<Typography>ID: 123456</Typography>
			</Grid>

			<Grid item container xs={9} spacing={3}>
				<Grid item>
					<Typography variant="h5" sx={{ mb: 2 }}>
						Battery
					</Typography>

					<BatteryChart width={800} height={500} />
				</Grid>

				<Grid item>
					<Typography variant="h5" sx={{ mb: 2 }}>
						Maintenance actions
					</Typography>

					<Button
						onClick={() => {
							setTurnedOn(!turnedOn);
						}}
						variant="contained"
						color={turnedOn ? "success" : "error"}
					>
						Turn {turnedOn ? "On" : "Off"} <PowerSettingsNewIcon />
					</Button>
				</Grid>

				{/*<Typography variant="h5">Related reports</Typography>*/}
				{/*<Typography variant="h5">Related logs</Typography>*/}
			</Grid>
		</Grid>
	);
}
