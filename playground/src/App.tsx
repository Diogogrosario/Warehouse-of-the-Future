import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { Canvas } from "@react-three/fiber";

import "./App.css";
import Cube from "./components/Cube";

class App extends React.Component {
	render(): JSX.Element {
		return (
			<div className="App">
				<AppBar position="static">
					<Toolbar>
						<Typography color="inherit">
							Warehouse of the Future - Playground
						</Typography>
					</Toolbar>
				</AppBar>
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
			</div>
		);
	}
}

export default App;
