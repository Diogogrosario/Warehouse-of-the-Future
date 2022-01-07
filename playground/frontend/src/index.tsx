import { CacheProvider } from "rest-hooks";
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

ReactDOM.render(
	<React.StrictMode>
		<CacheProvider>
			<App />
		</CacheProvider>
	</React.StrictMode>,

	document.getElementById("root")
);
