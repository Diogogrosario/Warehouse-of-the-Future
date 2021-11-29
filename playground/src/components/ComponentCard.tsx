import React from "react";
import { Card } from "@material-ui/core";

function ComponentCard(): React.ReactElement {
	return (
		<Card>
			<img src={require("../assets/images/circuit.jpg").default} alt="Component Image" />
		</Card>
	);
}

export default ComponentCard;
