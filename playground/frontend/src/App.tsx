import React, { SetStateAction } from "react";
import { Canvas } from "@react-three/fiber";
import "./App.css";
import Cube from "./components/Cube";
import { Box, Button, Divider, Grid, Tab, Tabs } from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";

export default function App() {
	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.ChangeEvent<{}>, newValue: SetStateAction<number>) => {
		setValue(newValue);
	};

	return (
		<div className="App">
			<Grid container>
				<Grid item sx={{ position: "relative", flex: 1 }}>
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

				<Divider orientation="vertical" flexItem />

				<Grid item sx={{ position: "relative", flex: 1 }}>
					<Tabs value={value} onChange={handleChange}>
						<Tab label="Reports" />
						<Tab label="Logs" />
						<Tab label="Devices" />
					</Tabs>

					<Button sx={{ position: "absolute", bottom: 0, right: 0 }}>
						<FullscreenIcon />
					</Button>
				</Grid>
			</Grid>
		</div>
	);
}

