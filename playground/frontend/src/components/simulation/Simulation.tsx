import React from "react";
import { Box, Button, Tab, Tabs, Theme, Typography } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import DeviceHubIcon from "@mui/icons-material/DeviceHub";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

import Coloring from "../../utils/coloring";
import TabPanel from "../TabPanel";

const Simulation: React.FC = () => {
	const [selectedTab, setSelectedTab] = React.useState(0);

	const [currentTick, setCurrentTick] = React.useState(0);

	return (
		<div
			style={{
				height: "100%",
				display: "grid",
				gridTemplateRows: "auto auto 1fr",
				gridTemplateAreas: `
                    "sim-header"
                    "sim-content"
                `,
				margin: "10px",
			}}
		>
			<div style={{ gridArea: "sim-header" }}>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
					}}
				>
					<Typography
						align="left"
						component="h3"
						variant="h5"
						style={{
							padding: "10px",
							opacity: 0.8,
						}}
					>
						Mesh Communication
					</Typography>
					<div
						style={{
							marginLeft: "auto",
							display: "flex",
						}}
					>
						<Button
							variant="contained"
							endIcon={<RestartAltIcon />}
							color="lightDark"
							style={{
								borderTopRightRadius: 0,
								borderBottomRightRadius: 0,
							}}
							onClick={() => setCurrentTick(0)}
						>
							Reset
						</Button>
						<Box
							sx={{
								borderRight: "1px solid transparent",
								borderColor: "rgb(23, 23, 23)",
								padding: "6px 16px",
								backgroundColor: (theme: Theme) =>
									Coloring.rgba(theme.palette.lightDark.main, 0.6),
								display: "flex",
								alignItems: "center",
							}}
						>
							<Typography
								variant="caption"
								component="span"
								style={{
									fontSize: "large",
									display: "flex",
									alignItems: "center",
								}}
							>
								Tick
								<AccessTimeIcon
									fontSize="small"
									style={{
										margin: "0 4px 0 8px",
									}}
								/>
								{currentTick}
							</Typography>
						</Box>
						<Button
							variant="contained"
							endIcon={<SkipNextIcon />}
							color="lightDark"
							style={{
								borderTopLeftRadius: 0,
								borderBottomLeftRadius: 0,
							}}
							onClick={() => setCurrentTick((prevState) => prevState + 1)}
						>
							Advance
						</Button>
					</div>
				</div>
				<Tabs
					value={selectedTab}
					onChange={(event: React.SyntheticEvent, newValue: number) =>
						setSelectedTab(newValue)
					}
					aria-label="simulation tabs"
					variant="standard"
					sx={{
						gridArea: "sim-nav",
						boxShadow: (theme: Theme) =>
							`inset 0 -1px 0 ${Coloring.rgba(theme.palette.white.main, 0.2)}`,
						".MuiTabs-flexContainer > .MuiTab-root": {
							color: "white.main",
							borderBottom: "2px solid transparent",
							"&:hover": {
								borderBottomColor: (theme: Theme) =>
									Coloring.rgba(theme.palette.white.main, 0.6),
							},
						},
						".MuiTabs-indicator": {
							backgroundColor: (theme: Theme) =>
								Coloring.rgba(theme.palette.amber.main, 0.8),
						},
					}}
				>
					<Tab
						id="sim-tab-0"
						aria-controls="sim-tabpanel-0"
						label="Metrics"
						icon={<BarChartIcon />}
						iconPosition="start"
					/>
					<Tab
						id="sim-tab-1"
						aria-controls="sim-tabpanel-1"
						label="Devices"
						icon={<DeviceHubIcon />}
						iconPosition="start"
					/>
				</Tabs>

				<TabPanel
					value={selectedTab}
					index={0}
					id="sim-tabpanel-0"
					aria-labelledby="sim-tab-0"
				></TabPanel>
				<TabPanel
					value={selectedTab}
					index={1}
					id="sim-tabpanel-1"
					aria-labelledby="sim-tab-1"
				></TabPanel>
			</div>
		</div>
	);
};

export default Simulation;
