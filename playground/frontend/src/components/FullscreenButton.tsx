import { FullscreenExit } from "@mui/icons-material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { Fab } from "@mui/material";
import React from "react";

import { FullscreenState } from "../App";

interface FullscreenProps {
	fullscreenState: FullscreenState;
	setFullscreen: (state: FullscreenState) => void;
	panelSide: FullscreenState;
}

export default function FullscreenButton(props: FullscreenProps) {
	const icon =
		props.fullscreenState == FullscreenState.Disabled ? <FullscreenIcon /> : <FullscreenExit />;

	return (
		<div style={{ position: "absolute", bottom: 16, right: 16 }}>
			<Fab
				color="secondary"
				aria-label={FullscreenState.Disabled ? "enter fullscreen" : "exit fullscreen"}
				onClick={() => {
					if (props.fullscreenState == FullscreenState.Disabled)
						props.setFullscreen(props.panelSide);
					else props.setFullscreen(FullscreenState.Disabled);
				}}
				id={
					props.panelSide == FullscreenState.Left
						? "warehouse-fullscreen-toggle"
						: "info-fullscreen-toggle"
				}
			>
				{icon}
			</Fab>
		</div>
	);
}
