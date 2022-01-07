import React from "react";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { Typography } from "@mui/material";

interface NoResultsOverlayProps {
	text: string;
}

const NoResultsOverlay: React.FC<NoResultsOverlayProps> = (props: NoResultsOverlayProps) => {
	const { text } = props;

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
			<SearchOffIcon style={{ fontSize: 72 }} />
			<Typography variant="body2" component="span" fontSize="large">
				{text}
			</Typography>
		</div>
	);
};

export default NoResultsOverlay;
