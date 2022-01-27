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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import BatteryChart from "./BatteryChart";
import Coloring from "../../utils/coloring";

export interface DeviceProps {
	id: number;
	position?: {
		x: number;
		y: number;
	};
	battery_max: number;
	battery_level: number[];
	orchestrator?: boolean;
}

export default function Device(props: DeviceProps): React.ReactElement {
	const { id, battery_max, battery_level } = props;

	return (
		<Accordion
			sx={{
				backgroundColor: "lightDark.main",
				color: "white.main",
				width: "100%",
				border: (theme: Theme) =>
					`1px solid ${Coloring.rgba(theme.palette.white.main, 0.2)}`,
				"&:hover": {
					".MuiAccordionSummary-root": {
						backgroundColor: "lightDarkBright.main",
					},
				},
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
				<Typography variant="h5" sx={{ pr: 2 }}>
					Mesh Device
				</Typography>
				<Typography
					variant="h5"
					sx={{
						color: (theme: Theme) => Coloring.rgba(theme.palette.white.main, 0.8),
					}}
				>
					#{id}
				</Typography>
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

					<BatteryChart
						width={800}
						height={500}
						batteryData={battery_level.map((element, index) => {
							return {
								timestamp: index,
								battery_power: ((element / battery_max) * 100).toString(),
							};
						})}
					/>
				</Stack>
			</AccordionDetails>
		</Accordion>
	);
}
