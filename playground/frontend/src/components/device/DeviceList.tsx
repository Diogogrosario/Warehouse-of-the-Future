import React from "react";
import Device from "./Device";
import { Grid, List } from "@mui/material";

export default function DeviceList(): React.ReactElement {
	const cards = [];

	for (let i = 0; i < 5; i++) cards.push(<Device />);

	return <List sx={{ overflow: "auto" }}>{cards}</List>;
}

