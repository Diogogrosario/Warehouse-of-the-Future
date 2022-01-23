import React from "react";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Divider,
	Stack,
	Theme,
	Typography,
} from "@mui/material";
import BatteryChart from "./BatteryChart";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Coloring from "../../utils/coloring";

export default function Device(): React.ReactElement {
	return (
		<Accordion
			sx={{
				backgroundColor: "lightDark.main",
				color: "white.main",
				width: "100%",
			}}
		>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				sx={{
					"& .MuiAccordionSummary-expandIconWrapper": {
						color: "white.main",
					},
				}}
			>
				<Stack>
					<Typography variant="h5">Mesh Device</Typography>
					<Typography variant="body1">ID: 123456</Typography>
				</Stack>
			</AccordionSummary>

			<Divider orientation="horizontal" flexItem />

			<AccordionDetails>
				<Stack direction="column" spacing={1}>
					<Typography
						variant="h6"
						sx={{
							color: (theme: Theme) => Coloring.rgba(theme.palette.white.main, 0.8),
						}}
					>
						Battery level
					</Typography>

					<BatteryChart width={800} height={500} />
				</Stack>
			</AccordionDetails>
		</Accordion>
	);
}
