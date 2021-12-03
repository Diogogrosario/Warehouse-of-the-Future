import React from "react";
import { Box, Button, Card, CardContent, CardMedia, Modal, Typography } from "@mui/material";
import DeviceDetails from "./DeviceDetails";

const style = {
	width: 1500,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
};

export default function DeviceCard(): React.ReactElement {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<div>
			<Modal open={open} onClose={handleClose} sx={style}>
				<Box sx={{ backgroundColor: "white", borderRadius: 3 }}>
					<DeviceDetails />
				</Box>
			</Modal>

			<Card sx={{ display: "flex", width: 350, height: 200, p: 1 }}>
				<CardMedia
					component="img"
					image={require("../assets/images/device.png").default}
					alt="Device Image"
					sx={{ width: 1 / 3 }}
				/>

				<CardContent>
					<Typography variant="h5">Mesh Device</Typography>

					<Typography variant="body2">ID: 123456</Typography>

					<Button variant="contained" onClick={handleOpen}>
						View Details
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
