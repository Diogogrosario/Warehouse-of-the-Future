import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet";
import { ThemeProvider } from "@mui/material";

import theme from "../styles/theme";


interface LayoutProps {
    children: React.ReactNode;
}

const Layout : React.FC<LayoutProps> = (props : LayoutProps) => {

    const { children } = props;

    return (
        <React.Fragment>
            <Helmet>
                <html lang="en" />
                <title>Warehouse of the Future - Playground</title>
                <meta name="description" content="A web-app with objective of providing the employees a way of simulating and visualising the warehouse" />
                <meta property="og:title" content="Warehouse of the Future - Playground" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="favicon.ico" />
                <link rel="apple-touch-icon" type="image/x-icon" href="favicon.ico" />
                <link rel="icon" type="image/x-icon" href="favicon.ico" />
            </Helmet>
            <ThemeProvider theme={theme}>
                <div className="appWrapper" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
                    <div className="appContainer" style={{ display: "flex", flexGrow: 1, flexDirection: "column", minHeight: "inherit" }}>
                        <AppBar>
                            <Toolbar>
                                <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                                    Warehouse of the Future - Playground
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <Container component="main" sx={{flexGrow: 1}} maxWidth={false}>
                            {children}
                        </Container>
                    </div>
                </div>
            </ThemeProvider>
        </React.Fragment>
    );
}

export default Layout;