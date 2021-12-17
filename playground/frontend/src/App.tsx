import React, { SetStateAction, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import "./App.css";
import Cube from "./components/Cube";
import { Box, Button, Divider, Grid, Tab, Tabs } from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { DragHandle, FullscreenExit } from "@mui/icons-material";

enum Fullscreen {
	Left,
	Disabled,
	Right,
}

export default function App() {
	const [selectedTab, setSelectedTab] = React.useState(0);
	const [panelWidth, setPanelWidth] = React.useState(60);
	const [fullscreen, setFullscreen] = React.useState(Fullscreen.Disabled);
	const [dragging, setDragging] = React.useState(false);

	const minPanelWidth = 20,
		maxPanelWidth = 80;

	const handleChange = (event: React.ChangeEvent<{}>, newValue: SetStateAction<number>) => {
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
		<div className="App">
			<Grid container sx={{ height: "100vh" }}>
				{fullscreen != Fullscreen.Right && (
					<Grid
						item
						sx={{
							position: "relative",
							width: fullscreen == Fullscreen.Left ? "100%" : `${panelWidth}%`,
						}}
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

						<Button
							sx={{ position: "absolute", bottom: 0, right: 0 }}
							onClick={() => {
								console.log(fullscreen);
								if (fullscreen == Fullscreen.Disabled)
									setFullscreen(Fullscreen.Left);
								else setFullscreen(Fullscreen.Disabled);
							}}
						>
							{fullscreen == Fullscreen.Left && <FullscreenExit />}
							{fullscreen != Fullscreen.Left && <FullscreenIcon />}
						</Button>
					</Grid>
				)}

				{fullscreen == Fullscreen.Disabled && (
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
							<DragHandle
								sx={{ transform: "rotate(90deg)", color: "rgba(0, 0, 0, 0.5)" }}
							/>
						</Divider>
					</Box>
				)}

				{fullscreen != Fullscreen.Left && (
					<Grid item sx={{ position: "relative", flex: 1, height: "100%" }}>
						<Tabs value={selectedTab} onChange={handleChange}>
							<Tab label="Reports" />
							<Tab label="Logs" />
							<Tab label="Devices" />
						</Tabs>

						<Button
							sx={{
								position: "absolute",
								bottom: 0,
								right: 0,
							}}
							onClick={() => {
								if (fullscreen == Fullscreen.Disabled)
									setFullscreen(Fullscreen.Right);
								else setFullscreen(Fullscreen.Disabled);
							}}
						>
							{fullscreen == Fullscreen.Right && <FullscreenExit />}
							{fullscreen != Fullscreen.Right && <FullscreenIcon />}
						</Button>
					</Grid>
				)}
			</Grid>
		</div>
	);
}
