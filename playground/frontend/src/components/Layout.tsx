import { AppBar, Container, Theme, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { ThemeProvider as MuiThemeProvider } from "@mui/material";
import { ThemeProvider as EmotionThemeProvider, Global, css } from "@emotion/react";

import theme from "../styles/theme";
import Coloring from "../utils/coloring";

interface LayoutProps {
	children: React.ReactNode;
	noScroll?: boolean;
}

const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
	const { children, noScroll } = props;

	return (
		<HelmetProvider>
			<Helmet>
				<html lang="en" />
				<title>Playground | Warehouse of the Future</title>
				<meta
					name="description"
					content="A web-app with objective of providing the employees a way of simulating and visualising the warehouse"
				/>
				<meta property="og:title" content="Playground | Warehouse of the Future" />
				<meta property="og:type" content="website" />
				<meta property="og:image" content="favicon.ico" />
				<link rel="apple-touch-icon" type="image/x-icon" href="favicon.ico" />
				<link rel="icon" type="image/x-icon" href="favicon.ico" />
			</Helmet>
			<MuiThemeProvider theme={theme}>
				<EmotionThemeProvider theme={theme}>
					<Global styles={styles(theme)} />
					<div className="appWrapper">
						<div
							className="appContainer"
							style={{ display: "flex", flexDirection: "column", height: "100%" }}
						>
							<AppBar position="relative">
								<Toolbar>
									<Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
										Playground | Warehouse of the Future
									</Typography>
								</Toolbar>
							</AppBar>
							<Container
								component="div"
								maxWidth={false}
								disableGutters
								sx={{
									display: "flex",
									flexGrow: 1,
									...(noScroll && { overflow: "hidden" }),
								}}
							>
								{children}
							</Container>
						</div>
					</div>
				</EmotionThemeProvider>
			</MuiThemeProvider>
		</HelmetProvider>
	);
};

export default Layout;

const styles = (theme: Theme) => css`
	html {
		background-color: ${theme.palette.dark.main};
		color: ${theme.palette.white.main};
		scrollbar-width: 16px;
		scrollbar-color: ${Coloring.rgba(theme.palette.white.main, 0.6)};
	}

	*::-webkit-scrollbar {
		width: 16px;
	}

	*::-webkit-scrollbar-thumb {
		background-clip: content-box;
		background-color: ${Coloring.rgba(theme.palette.white.main, 0.2)};
		border-radius: 8px;
		border: 4px solid transparent;
	}

	*::-webkit-scrollbar-thumb:hover {
		background-color: ${Coloring.rgba(theme.palette.white.main, 0.5)};
	}

	*::-webkit-scrollbar-thumb:active {
		background-color: ${Coloring.rgba(theme.palette.white.main, 0.8)};
	}

	body {
		margin: 0;
	}

	.appWrapper {
		height: 100vh;
		display: flex;
		flex-direction: column;
	}
`;
