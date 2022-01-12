import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import AppTheme from "./AppTheme";
import AppRouter from "./AppRouter";

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={AppTheme}>
            <CssBaseline />
            <AppRouter />
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
