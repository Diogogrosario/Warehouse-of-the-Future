import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { Canvas } from "@react-three/fiber";

import "./App.css";
import Cube from "./components/Cube";
import WarehouseRenderer from "./components/WarehouseRenderer";

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
					
				<WarehouseRenderer title='' />
			</div>
		);
	}
}

export default App;
