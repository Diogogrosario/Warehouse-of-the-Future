import React from "react";
import { Box, Container } from "@material-ui/core";

function Component(): React.ReactElement {
	return (
		<Container>
			<img
				width={200}
				src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Electronic-Component-Red-LED.jpg/1200px-Electronic-Component-Red-LED.jpg"
				alt="LED"
			/>
		</Container>
	);
}

export default Component;
