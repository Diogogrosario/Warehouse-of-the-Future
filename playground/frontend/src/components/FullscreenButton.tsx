import { FullscreenExit } from "@mui/icons-material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { Button } from "@mui/material";
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
		<Button
			onClick={() => {
				if (props.fullscreenState == FullscreenState.Disabled)
					props.setFullscreen(props.panelSide);
				else props.setFullscreen(FullscreenState.Disabled);
			}}
		>
			{icon}
		</Button>
	);
}
