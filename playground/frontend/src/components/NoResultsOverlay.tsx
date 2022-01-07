import React from "react";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { Typography } from "@mui/material";

interface NoResultsOverlayProps {
	text: string;
	iconSize?: number;
	textSize?: string;
}

const NoResultsOverlay: React.FC<NoResultsOverlayProps> = (props: NoResultsOverlayProps) => {
	const { text, iconSize, textSize } = props;

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				height: "100%",
			}}
		>
			<SearchOffIcon style={{ fontSize: iconSize ?? 72 }} />
			<Typography variant="body2" component="span" fontSize={textSize ?? "large"}>
				{text}
			</Typography>
		</div>
	);
};

export default NoResultsOverlay;
