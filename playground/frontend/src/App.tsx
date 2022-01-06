import React, { SetStateAction, useEffect } from "react";
import { Grid, Tab, Tabs, useMediaQuery } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import FullscreenButton from "./components/FullscreenButton";
import PanelDivider from "./components/PanelDivider";
import WarehouseRenderer from "./components/WarehouseRenderer";
import theme from "./styles/theme";
import ReportList from "./components/ReportList";

export enum FullscreenState {
	Left,
	Disabled,
	Right,
}

export default function App() {
	const mobile = useMediaQuery("(max-width: 800px)");

	const [selectedTab, setSelectedTab] = React.useState(0);
	const [panelSize, setPanelSize] = React.useState(60);
	const [dragging, setDragging] = React.useState(false);
	const [fullscreen, setFullscreen] = React.useState(FullscreenState.Disabled);

	const minPanelSize = 20,
		maxPanelSize = 80;

	const handleChange = (event: React.SyntheticEvent, newValue: SetStateAction<number>) => {
		setSelectedTab(newValue);
	};

	const handleMouseMove = (e: MouseEvent) => {
		if (dragging) {
			const newSize = mobile
				? ((e.clientY - document.body.offsetTop) / document.body.clientHeight) * 100
				: ((e.clientX - document.body.offsetLeft) / document.body.clientWidth) * 100;

			if (newSize > minPanelSize && newSize < maxPanelSize) setPanelSize(newSize);
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
			<div
				className="App"
				style={{
					display: "flex",
					flexDirection: "column",
					height: "100%",
					width: "100%",
					margin: 0,
				}}
			>
				<Grid container sx={{ height: "100vh" }} direction={mobile ? "column" : "row"}>
					{fullscreen != FullscreenState.Right && (
						<Grid
							item
							sx={{
								position: "relative",
								width:
									mobile || fullscreen == FullscreenState.Left
										? "100%"
										: `${panelSize}%`,
								height:
									!mobile || fullscreen == FullscreenState.Left
										? "100%"
										: `${panelSize}%`,
							}}
							id="warehouse-panel"
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
						<PanelDivider
							handleMouseDown={handleMouseDown}
							orientation={mobile ? "horizontal" : "vertical"}
						/>
					)}

					{fullscreen != FullscreenState.Left && (
						<Grid
							item
							id="info-panel"
							sx={{
								position: "relative",
								flex: 1,
								height: "100%",
							}}
						>
							<Tabs value={selectedTab} onChange={handleChange}>
								<Tab label="Reports" />
								<Tab label="Logs" />
								<Tab label="Devices" />
							</Tabs>

							<ReportList />

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
