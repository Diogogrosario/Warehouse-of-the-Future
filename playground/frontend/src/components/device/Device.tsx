import React from "react";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Container,
	Stack,
	Typography,
} from "@mui/material";
import BatteryChart from "./BatteryChart";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Device(): React.ReactElement {
	return (
		<Accordion
			sx={{
				backgroundColor: "lightDark.main",
				color: "white.main",
				width: "100%",
			}}
		>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Stack>
					<Typography variant="h5">Mesh Device</Typography>
					<Typography variant="body1">ID: 123456</Typography>
				</Stack>
			</AccordionSummary>

			<AccordionDetails>
				<Stack direction="column" spacing={1}>
					<Typography variant="h5" sx={{ mb: 2 }}>
						Battery
					</Typography>

					<BatteryChart width={800} height={500} />
				</Stack>
			</AccordionDetails>
		</Accordion>
	);
}
