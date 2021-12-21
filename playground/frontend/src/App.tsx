import React, { SetStateAction, useEffect } from "react";
import { Grid, Tab, Tabs, useMediaQuery } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import FullscreenButton from "./components/FullscreenButton";
import PanelDivider from "./components/PanelDivider";
import WarehouseRenderer from "./components/WarehouseRenderer";
import Report from "./components/Report";
import theme from "./styles/theme";

import "./App.css";

export enum FullscreenState {
	Left,
	Disabled,
	Right,
}

export default function App() {
	const matches = useMediaQuery("(min-width: 800px)");

	const [selectedTab, setSelectedTab] = React.useState(0);
	const [panelWidth, setPanelWidth] = React.useState(60);
	const [dragging, setDragging] = React.useState(false);
	const [fullscreen, setFullscreen] = React.useState(FullscreenState.Disabled);

	const minPanelWidth = 20,
		maxPanelWidth = 80;

	const handleChange = (event: React.SyntheticEvent, newValue: SetStateAction<number>) => {
		setSelectedTab(newValue);
	};

	const handleMouseMove = (e: MouseEvent) => {
		if (dragging) {
			const newWidth =
				((e.clientX - document.body.offsetLeft) / document.body.clientWidth) * 100;

			if (newWidth > minPanelWidth && newWidth < maxPanelWidth) setPanelWidth(newWidth);
		}
	};

	const handleMouseDown = () => {
		setDragging(true);
	};

	const handleMouseUp = () => {
		setDragging(false);
	};

	useEffect(() => {
		document.addEventListener("mouseup", handleMouseUp);
		document.addEventListener("mousemove", handleMouseMove);

		return () => {
			document.removeEventListener("mouseup", handleMouseUp);
			document.removeEventListener("mousemove", handleMouseMove);
		};
	});

	return (
		<ThemeProvider theme={theme}>
			<div className="App">
				<Grid container sx={{ height: "100vh" }} direction={matches ? "row" : "column"}>
					{fullscreen != FullscreenState.Right && (
						<Grid
							item
							sx={{
								position: "relative",
								width:
									fullscreen == FullscreenState.Left ? "100%" : `${panelWidth}%`,
							}}
						>
							<WarehouseRenderer />

							<FullscreenButton
								fullscreenState={fullscreen}
								setFullscreen={setFullscreen}
								panelSide={FullscreenState.Left}
							/>
						</Grid>
					)}

					{fullscreen == FullscreenState.Disabled && (
						<PanelDivider handleMouseDown={handleMouseDown} orientation={"vertical"} />
					)}

					{fullscreen != FullscreenState.Left && (
						<Grid item sx={{ position: "relative", flex: 1, height: "100%" }}>
							<Tabs value={selectedTab} onChange={handleChange}>
								<Tab label="Reports" />
								<Tab label="Logs" />
								<Tab label="Devices" />
							</Tabs>

							<Report
								title="Report Testing"
								description="This is a testing report with a brief description on top of it. This line is just to make this description even longer than it should be"
								shortDescription="A brief description of the problem"
								warningLevel="warning"
								actions={[
									["04:05", "Latest action to be performed"],
									["04:00", "Previous Action"],
								]}
								resolved={false}
								reportId={1}
							/>

							<FullscreenButton
								fullscreenState={fullscreen}
								setFullscreen={setFullscreen}
								panelSide={FullscreenState.Right}
							/>
						</Grid>
					)}
				</Grid>
			</div>
		</ThemeProvider>
	);
}
