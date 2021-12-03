import React, { useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import SimpleChart from "./SimpleChart";

export default function Device(): React.ReactElement {
	const [turnedOn, setTurnedOn] = useState(false);

	return (
		<Grid container>
			<Grid item xs={3}>
				<div style={{ textAlign: "center" }}>
					<img
						height={400}
						src={require("../assets/images/device.png").default}
						alt="Device Image"
					/>
				</div>

				<Typography variant="h5">Mesh Device</Typography>

				<Typography>ID: 123456</Typography>
			</Grid>

			<Grid item xs={9}>
				<div>
					<Typography variant="h5" align={"left"}>
						Battery
					</Typography>

					<SimpleChart width={800} height={500}/>
				</div>

				<Typography variant="h5">Maitenance actions</Typography>

				<Button
					onClick={() => {
						setTurnedOn(!turnedOn);
					}}
					variant="contained"
					color={turnedOn ? "success" : "error"}
				>
					Turn {turnedOn ? "On" : "Off"} <PowerSettingsNewIcon />
				</Button>

				{/*<Typography variant="h5">Related reports</Typography>*/}
				{/*<Typography variant="h5">Related logs</Typography>*/}
			</Grid>
		</Grid>
	);
}
