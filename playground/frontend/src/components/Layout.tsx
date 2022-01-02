import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@mui/material";

import theme from "../styles/theme";


interface LayoutProps {
    children: React.ReactNode;
    noScroll?: boolean;
}

const Layout : React.FC<LayoutProps> = (props : LayoutProps) => {

    const { children, noScroll } = props;

    return (
        <HelmetProvider>
            <Helmet>
                <html lang="en" />
                <title>Playground | Warehouse of the Future</title>
                <meta name="description" content="A web-app with objective of providing the employees a way of simulating and visualising the warehouse" />
                <meta property="og:title" content="Playground | Warehouse of the Future" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="favicon.ico" />
                <link rel="apple-touch-icon" type="image/x-icon" href="favicon.ico" />
                <link rel="icon" type="image/x-icon" href="favicon.ico" />
            </Helmet>
            <ThemeProvider theme={theme}>
                <div className="appWrapper"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100vh",
                        width: "100%",
                        margin: 0,
                    }}    
                >
                    <div className="appContainer" style={{ display: "flex", flexDirection: "column", height: " inherit"}}>
                        <AppBar position="relative">
                            <Toolbar>
                                <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                                    Playground | Warehouse of the Future
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <Container component="main" maxWidth={false} sx={{ display: "flex", flexGrow: 1, ...(noScroll && { overflow: "hidden" }) }} >
                            {children}
                        </Container>
                    </div>
                </div>
            </ThemeProvider>
        </HelmetProvider>
    );
}

export default Layout;