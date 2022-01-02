import React, { SetStateAction, useEffect } from "react";
import { Grid, Paper, Tab, Tabs, useMediaQuery } from "@mui/material";

import FullscreenButton from "./components/FullscreenButton";
import PanelDivider from "./components/PanelDivider";
import WarehouseRenderer from "./components/WarehouseRenderer";
import Layout from "./components/Layout";
import LabelPicker from "./components/LabelPicker";
import ReportList from "./components/ReportList";

export enum FullscreenState {
	Left,
	Disabled,
	Right,
}

const labels = [
	{
	  name: 'good first issue',
	  color: '#7057ff',
	  description: 'Good for newcomers',
	},
	{
	  name: 'help wanted',
	  color: '#008672',
	  description: 'Extra attention is needed',
	},
	{
	  name: 'priority: critical',
	  color: '#b60205',
	  description: '',
	},
	{
	  name: 'priority: high',
	  color: '#d93f0b',
	  description: '',
	},
	{
	  name: 'priority: low',
	  color: '#0e8a16',
	  description: '',
	},
	{
	  name: 'priority: medium',
	  color: '#fbca04',
	  description: '',
	},
	{
	  name: "status: can't reproduce",
	  color: '#fec1c1',
	  description: '',
	},
	{
	  name: 'status: confirmed',
	  color: '#215cea',
	  description: '',
	},
	{
	  name: 'status: duplicate',
	  color: '#cfd3d7',
	  description: 'This issue or pull request already exists',
	},
	{
	  name: 'status: needs information',
	  color: '#fef2c0',
	  description: '',
	},
	{
	  name: 'status: wont do/fix',
	  color: '#eeeeee',
	  description: 'This will not be worked on',
	},
	{
	  name: 'type: bug',
	  color: '#d73a4a',
	  description: "Something isn't working",
	},
	{
	  name: 'type: discussion',
	  color: '#d4c5f9',
	  description: '',
	},
	{
	  name: 'type: documentation',
	  color: '#006b75',
	  description: '',
	},
	{
	  name: 'type: enhancement',
	  color: '#84b6eb',
	  description: '',
	},
	{
	  name: 'type: epic',
	  color: '#3e4b9e',
	  description: 'A theme of work that contain sub-tasks',
	},
	{
	  name: 'type: feature request',
	  color: '#fbca04',
	  description: 'New feature or request',
	},
	{
	  name: 'type: question',
	  color: '#d876e3',
	  description: 'Further information is requested',
	},
  ];


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
		<Layout noScroll>
			<Grid container sx={{ maxHeight: "100%" }} direction={mobile ? "column" : "row"}>
				{fullscreen != FullscreenState.Right && (
					<Grid
						item
						container
						sx={{
							position: "relative",
							width:
								mobile || fullscreen == FullscreenState.Left
									? "100%"
									: `${panelSize}%`,
							height:
								!mobile || fullscreen == FullscreenState.Left
									? "100%"
									: `${panelSize}%`
						}}
					>
						<Grid item xs={12}>
								<WarehouseRenderer />
						</Grid>
						<Grid item sx={{ marginLeft: "auto", mt: "auto" }}>
							<FullscreenButton
								fullscreenState={fullscreen}
								setFullscreen={setFullscreen}
								panelSide={FullscreenState.Left}
							/>
						</Grid>
					</Grid>
				)}

				{fullscreen == FullscreenState.Disabled && (
					<PanelDivider
						handleMouseDown={handleMouseDown}
						orientation={mobile ? "horizontal" : "vertical"}
					/>
				)}

				{fullscreen != FullscreenState.Left && (
					<Grid item container sx={{ position: "relative", flex: 1, maxHeight: "100%", overflow: "auto" }} >
							<Grid item xs={12}>
								<Tabs value={selectedTab} onChange={handleChange}>
									<Tab label="Reports" />
									<Tab label="Logs" />
									<Tab label="Devices" />
								</Tabs>

								<Paper>
										<LabelPicker labels={labels} />
										<ReportList />
								</Paper>

							</Grid>

							<Grid item sx={{ marginLeft: "auto", mt: "auto" }}>
								<FullscreenButton
									fullscreenState={fullscreen}
									setFullscreen={setFullscreen}
									panelSide={FullscreenState.Right}
									/>
							</Grid>
						</Grid>
				)}
			</Grid>
		</Layout>
		
	);
}
