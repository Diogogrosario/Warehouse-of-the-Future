import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import "./App.css";
import Cube from "./components/Cube.js";

class App extends React.Component {
	render() {
		return (
			<div className="App">
				<AppBar position="static">
					<Toolbar>
						<Typography variant="title" color="inherit">
							Warehouse of the Future - Playground
						</Typography>
					</Toolbar>
				</AppBar>

				<Cube></Cube>
			</div>
		);
	}
}

export default App;
