import React, { Suspense, useEffect } from "react";
import { Grid, styled, Tab, Tabs, Typography, useMediaQuery } from "@mui/material";
import { NetworkError, NetworkErrorBoundary } from "rest-hooks";

import FullscreenButton from "./components/FullscreenButton";
import PanelDivider from "./components/PanelDivider";
import WarehouseRenderer from "./components/WarehouseRenderer";
import Layout from "./components/Layout";
import ReportList from "./components/report/ReportList";
import TabPanel from "./components/TabPanel";
import NoResultsOverlay from "./components/NoResultsOverlay";
import theme from "./styles/theme";
import Simulation from "./components/simulation/Simulation";

export enum FullscreenState {
	Left,
	Disabled,
	Right,
}

const StyledTabPanel = styled(TabPanel)(() => ({
	height: "100%",
}));

interface AsyncBoundaryProps {
	children: React.ReactNode;
	loadingFallback?: React.ReactElement;
	errorFallback?: React.ComponentType<{ error: NetworkError }>;
}

const AsyncBoundary: React.FC<AsyncBoundaryProps> = ({
	children,
	loadingFallback,
	errorFallback,
}: AsyncBoundaryProps) => {
	return (
		<Suspense fallback={loadingFallback ?? <span>loading</span>}>
			<NetworkErrorBoundary
				fallbackComponent={
					errorFallback ??
					(({ error }: { error: NetworkError }) => (
						<div>
							{error.status} {error.response?.statusText}
						</div>
					))
				}
			>
				{children}
			</NetworkErrorBoundary>
		</Suspense>
	);
};

export default function App() {
	const mobile = useMediaQuery("(max-width: 800px)");

	const [selectedTab, setSelectedTab] = React.useState(1);
	const [panelSize, setPanelSize] = React.useState(60);
	const [dragging, setDragging] = React.useState(false);
	const [fullscreen, setFullscreen] = React.useState(FullscreenState.Disabled);

	const minPanelSize = 20,
		maxPanelSize = 80;

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
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
		<Layout noScroll>
			<Grid container direction={mobile ? "column" : "row"}>
				{fullscreen != FullscreenState.Right && (
					<Grid
						item
						id="warehouse-panel"
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
					>
						<WarehouseRenderer background={theme.palette.dark.main} />
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
							width: mobile || fullscreen == FullscreenState.Right ? "100%" : "auto",
							height:
								!mobile || fullscreen != FullscreenState.Right ? "100%" : "auto",
						}}
					>
						<Tabs
							value={selectedTab}
							onChange={handleChange}
							indicatorColor="secondary"
							aria-label="tabs navigation"
							variant="fullWidth"
							sx={{
								marginBottom: "10px",
								".MuiTabs-flexContainer > .MuiTab-root": {
									backgroundColor: "lightDark.main",
									color: "secondary.main",
									"&:hover": {
										backgroundColor: "lightDarkBright.main",
									},
								},
							}}
						>
							<Tab
								label="Reports"
								id="app-tab-0"
								className="app-tab"
								aria-controls="app-tabpanel-0"
							/>
							<Tab
								label="Simulation"
								id="app-tab-1"
								className="app-tab"
								aria-controls="app-tabpanel-1"
							/>
						</Tabs>

						{/* Reports */}
						<StyledTabPanel
							emptyComponent={<NoResultsOverlay text="No reports found" />}
							value={selectedTab}
							index={0}
							id="app-tabpanel-0"
							aria-labelledby="app-tab-0"
						>
							<AsyncBoundary
								loadingFallback={
									<div
										style={{
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
											justifyContent: "center",
											height: "100%",
										}}
									>
										<div
											style={{
												width: "160px",
												height: "160px",
												background: `url("assets/bugcatEggRoll.gif") no-repeat center center`,
											}}
										/>
										<Typography variant="h4" component="h6">
											Loading reports...
										</Typography>
									</div>
								}
								errorFallback={() => (
									<div
										style={{
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
											justifyContent: "center",
											height: "100%",
										}}
									>
										<div
											style={{
												width: "160px",
												height: "160px",
												background: `url("assets/bugcatShock.webp") no-repeat center center`,
											}}
										/>
										<Typography variant="h4" component="h6">
											Connection failed
										</Typography>
									</div>
								)}
							>
								<ReportList />
							</AsyncBoundary>
						</StyledTabPanel>

						{/* Devices */}
						<StyledTabPanel
							value={selectedTab}
							emptyComponent={<NoResultsOverlay text="No devices found" />}
							index={1}
							id="app-tabpanel-1"
							aria-labelledby="app-tab-1"
						>
							<Simulation />
						</StyledTabPanel>

						<FullscreenButton
							fullscreenState={fullscreen}
							setFullscreen={setFullscreen}
							panelSide={FullscreenState.Right}
						/>
					</Grid>
				)}
			</Grid>
		</Layout>
	);
}
