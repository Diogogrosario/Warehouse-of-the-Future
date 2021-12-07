import React from "react";
import { Canvas } from "@react-three/fiber";
import MenuIcon from "@mui/icons-material/Menu";

import "./App.css";
import Cube from "./components/Cube";
import {
	AppBar,
	Box,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Toolbar,
	Typography,
} from "@mui/material";
import ReportIcon from '@mui/icons-material/Report';

class App extends React.Component {
	render(): JSX.Element {
		return (
			<div className="App">
				<Drawer
					open={true}
				>
					<List>
						<ListItem button key={"Reports"}>
							<ListItemIcon>
								<ReportIcon />
							</ListItemIcon>

							<ListItemText primary={"Reports"} />
						</ListItem>
					</List>
				</Drawer>

				<Box sx={{ flexGrow: 1 }}>
					<AppBar position="static">
						<Toolbar>
							<IconButton
								size="large"
								edge="start"
								color="inherit"
								aria-label="menu"
								sx={{ mr: 2 }}
							>
								<MenuIcon />
							</IconButton>

							<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
								Warehouse of the Future
							</Typography>
						</Toolbar>
					</AppBar>
				</Box>

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
