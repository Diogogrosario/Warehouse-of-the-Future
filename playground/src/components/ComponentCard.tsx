import React from "react";
import { Card } from "@material-ui/core";

function ComponentCard(): React.ReactElement {
	return (
		<Card>
			<img
				src="https://cdn-icons-png.flaticon.com/512/2338/2338838.png"
				alt="Component Image"
			/>
		</Card>
	);
}

export default ComponentCard;
