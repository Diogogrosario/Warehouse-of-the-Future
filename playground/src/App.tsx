import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

import "./App.css";
import WarehouseRenderer from "./components/renderer/WarehouseRenderer";

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
					
				<WarehouseRenderer />
			</div>
		);
	}
}

export default App;
