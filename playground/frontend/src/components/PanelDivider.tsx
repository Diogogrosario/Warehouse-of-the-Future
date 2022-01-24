import { Box, Divider } from "@mui/material";
import { DragHandle } from "@mui/icons-material";
import React from "react";

interface PanelDividerProps {
	handleMouseDown: () => void;
	orientation: "vertical" | "horizontal";
}

export default function PanelDivider(props: PanelDividerProps) {
	return (
		<Box
			sx={{
				cursor: props.orientation == "vertical" ? "col-resize" : "row-resize",
				backgroundColor: "transparent",
			}}
			onMouseDown={props.handleMouseDown}
		>
			<Divider
				orientation={props.orientation}
				sx={{
					backgroundColor: "lightDark.main",
					opacity: 0.5,
					"&:hover": {
						backgroundColor: "lightDarkBright.main",
						opacity: 0.8,
					},
					"> .MuiDivider-wrapper": {
						padding: "0",
					},
				}}
			>
				<DragHandle
					sx={{
						transform:
							props.orientation == "vertical" ? "rotate(90deg)" : "rotate(0deg)",
						color: "white.main",
					}}
				/>
			</Divider>
		</Box>
	);
}
