import React from "react";
import ReportIcon from "@mui/icons-material/Report";
import { Grid, Tooltip, Typography } from "@mui/material";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import Battery20Icon from "@mui/icons-material/Battery20";
import Battery50Icon from "@mui/icons-material/Battery50";
import Battery90Icon from "@mui/icons-material/Battery90";
import BatteryAlertIcon from "@mui/icons-material/BatteryAlert";

export interface MetricsProps {
	ticks: number;
	prevBatTick: number;
	currBatTick: number;
	batCommunication: number;
	failed: number;
}

const Metrics: React.FC<MetricsProps> = (props: MetricsProps) => {
	const { ticks, prevBatTick, currBatTick, batCommunication, failed } = props;

	const avgUsage = batCommunication / ticks || 0;
	const lowUsageLimit = avgUsage * 0.9;
	const highUsageLimit = avgUsage * 1.1;
	const criticalUsageLimit = avgUsage * 1.2;

	const lowBatUsage = currBatTick < lowUsageLimit;
	const criticalBatUsage = currBatTick > criticalUsageLimit;
	const highBatUsage = currBatTick > highUsageLimit && currBatTick <= criticalUsageLimit;
	const normalBatUsage = currBatTick >= lowUsageLimit && currBatTick <= highUsageLimit;

	const batteryUsageTooltip = lowBatUsage
		? "Low battery usage"
		: criticalBatUsage
		? "Critical battery usage"
		: highBatUsage
		? "High battery usage"
		: "Normal battery usage";

	return (
		<Grid
			container
			rowSpacing={8}
			direction="column"
			style={{
				height: "100%",
				margin: "32px 0",
			}}
		>
			<Grid
				item
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Typography
					variant="h4"
					component="h6"
					style={{
						display: "flex",
						alignItems: "center",
					}}
				>
					{failed}
					<ReportIcon color="error" fontSize="large" style={{ margin: "0 8px" }} />
				</Typography>
				<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
					<Typography variant="h6" component="span" style={{ opacity: 0.8 }}>
						Messages Failed
					</Typography>
					<Typography
						variant="body2"
						component="span"
						style={{ opacity: 0.4 }}
						fontSize="small"
					>
						Total number of failures in the system
					</Typography>
				</div>
			</Grid>

			<Grid
				item
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Tooltip title={batteryUsageTooltip}>
					<Typography
						variant="h4"
						component="h6"
						style={{
							display: "flex",
							alignItems: "center",
						}}
					>
						{currBatTick}mAh
						<Typography
							variant="h5"
							component="span"
							sx={{
								marginLeft: "8px",
								opacity: 1.0,
								...(lowBatUsage && {
									color: "success.main",
								}),
								...(criticalBatUsage && {
									color: "error.main",
								}),
								...(highBatUsage && {
									color: "warning.main",
								}),
								...(normalBatUsage && {
									color: "white.main",
									opacity: 0.8,
								}),
							}}
						>
							({currBatTick >= prevBatTick ? "+" : ""}
							{((currBatTick / prevBatTick - 1) * 100 || 0).toFixed(2)}%)
						</Typography>
						{lowBatUsage && <Battery20Icon color="success" fontSize="large" />}
						{criticalBatUsage && <BatteryAlertIcon color="error" fontSize="large" />}
						{highBatUsage && <Battery90Icon color="warning" fontSize="large" />}
						{normalBatUsage && (
							<Battery50Icon style={{ opacity: 0.8 }} fontSize="large" />
						)}
					</Typography>
				</Tooltip>
				<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
					<Typography variant="h6" component="span" style={{ opacity: 0.8 }}>
						Battery consumption
					</Typography>
					<Typography
						variant="body2"
						component="span"
						style={{ opacity: 0.4 }}
						fontSize="small"
					>
						Battery consumed in the last tick
					</Typography>
				</div>
			</Grid>

			<Grid
				item
				style={{
					gridArea: "consum-total",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Typography
					variant="h4"
					component="h6"
					style={{
						display: "flex",
						alignItems: "center",
					}}
				>
					{batCommunication}mAh
					<DataUsageIcon color="info" fontSize="large" style={{ margin: "0 8px" }} />
				</Typography>
				<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
					<Typography variant="h6" component="span" style={{ opacity: 0.8 }}>
						Total consumption
					</Typography>
					<Typography
						variant="body2"
						component="span"
						style={{ opacity: 0.4 }}
						fontSize="small"
					>
						Total battery consumption in the communication
					</Typography>
				</div>
			</Grid>
		</Grid>
	);
};

export default Metrics;
