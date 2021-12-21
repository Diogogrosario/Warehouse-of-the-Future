import React, { SetStateAction, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Box, Button, Divider, Grid, Tab, Tabs } from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { DragHandle } from "@mui/icons-material";
import { ThemeProvider } from '@mui/material/styles';

import theme from "./styles/theme";

import "./App.css";
import Cube from "./components/Cube";
import Report from "./components/Report";


export default function App() {
	const [selectedTab, setSelectedTab] = React.useState(0);
	const [panelWidth, setPanelWidth] = React.useState(60);
	const minPanelWidth = 20,
		maxPanelWidth = 80;

	const handleChange = (event: React.SyntheticEvent, newValue: SetStateAction<number>) => {
		setSelectedTab(newValue);
	};

	const [dragging, setDragging] = React.useState(false);

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
				<Grid container>
					<Grid
						item
						sx={{ position: "relative", width: `${panelWidth}%`}}
					>
						<Canvas
							style={{ height: "90vh" }}
							camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 5] }}
							resize={{ scroll: true, debounce: { scroll: 50, resize: 0 } }}
						>
							<ambientLight intensity={0.5} />
							<spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
							<pointLight position={[-10, -10, -10]} />
							<Cube />
						</Canvas>

						<Button sx={{ position: "absolute", bottom: 0, right: 0 }}>
							<FullscreenIcon />
						</Button>
					</Grid>

					<Box
						sx={{
							cursor: "ew-resize",
							backgroundColor: "transparent",
						}}
						onMouseDown={handleMouseDown}
					>
						<Divider
							orientation="vertical"
							sx={{
								"> .MuiDivider-wrapper": {
									padding: "0",
								},
							}}
						>
							<DragHandle sx={{ transform: "rotate(90deg)", color: "rgba(0, 0, 0, 0.5)" }} />
						</Divider>
					</Box>

					<Grid item sx={{ position: "relative", flex: 1 }}>
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
								[ "04:05", "Latest action to be performed" ],
								[ "04:00", "Previous Action" ]
							]}
							resolved={false}
							reportId={1}
						/>

						<Button sx={{ position: "absolute", bottom: 0, right: 0 }}>
							<FullscreenIcon />
						</Button>
					</Grid>
				</Grid>
			</div>
		</ThemeProvider>
	);
}
