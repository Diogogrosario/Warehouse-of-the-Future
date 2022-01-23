import { createTheme, ThemeOptions } from "@mui/material";

declare module "@mui/material/styles" {
	interface Palette {
		red: Palette["primary"];
		pink: Palette["primary"];
		purple: Palette["primary"];
		deepPurple: Palette["primary"];
		indigo: Palette["primary"];
		blue: Palette["primary"];
		lightBlue: Palette["primary"];
		cyan: Palette["primary"];
		teal: Palette["primary"];
		green: Palette["primary"];
		lightGreen: Palette["primary"];
		lime: Palette["primary"];
		yellow: Palette["primary"];
		amber: Palette["primary"];
		orange: Palette["primary"];
		deepOrange: Palette["primary"];
		brown: Palette["primary"];
		blueGray: Palette["primary"];
		gray: Palette["primary"];
		white: Palette["primary"];
		black: Palette["primary"];
		dark: Palette["primary"];
		darkBlack: Palette["primary"];
		lightDark: Palette["primary"];
		lightDarkBright: Palette["primary"];
	}

	interface PaletteOptions {
		red?: PaletteOptions["primary"];
		pink?: PaletteOptions["primary"];
		purple?: PaletteOptions["primary"];
		deepPurple?: PaletteOptions["primary"];
		indigo?: PaletteOptions["primary"];
		blue?: PaletteOptions["primary"];
		lightBlue?: PaletteOptions["primary"];
		cyan?: PaletteOptions["primary"];
		teal?: PaletteOptions["primary"];
		green?: PaletteOptions["primary"];
		lightGreen?: PaletteOptions["primary"];
		lime?: PaletteOptions["primary"];
		yellow?: PaletteOptions["primary"];
		amber?: PaletteOptions["primary"];
		orange?: PaletteOptions["primary"];
		deepOrange?: PaletteOptions["primary"];
		brown?: PaletteOptions["primary"];
		blueGray?: PaletteOptions["primary"];
		gray?: PaletteOptions["primary"];
		white?: PaletteOptions["primary"];
		black?: PaletteOptions["primary"];
		dark?: PaletteOptions["primary"];
		darkBlack: PaletteOptions["primary"];
		lightDark?: PaletteOptions["primary"];
		lightDarkBright?: PaletteOptions["primary"];
	}
}

declare module "@mui/material/Button" {
	interface ButtonPropsColorOverrides {
		red: true;
		pink: true;
		purple: true;
		deepPurple: true;
		indigo: true;
		blue: true;
		lightBlue: true;
		cyan: true;
		teal: true;
		green: true;
		lightGreen: true;
		lime: true;
		yellow: true;
		amber: true;
		orange: true;
		deepOrange: true;
		brown: true;
		blueGray: true;
		gray: true;
		white: true;
		black: true;
		dark: true;
		darkBlack: true;
		lightDark: true;
		lightDarkBright: true;
	}
}

const baseTheme = createTheme({
	spacing: 8,
	palette: {
		mode: "light",
		primary: {
			main: "#212121",
		},
		secondary: {
			main: "#7397f4",
		},
		error: {
			main: "#bc0000",
		},
		warning: {
			main: "#ed8c04",
		},
		info: {
			main: "#90caf9",
		},
		success: {
			main: "#aed581",
		},
		red: {
			main: "#d32f2f",
		},
		pink: {
			main: "#fdb8ff",
		},
		purple: {
			main: "#ab47bc",
		},
		deepPurple: {
			main: "#5e35b1",
		},
		indigo: {
			main: "#3f51b5",
		},
		blue: {
			main: "#47afff",
		},
		lightBlue: {
			main: "#36c3ff",
		},
		cyan: {
			main: "#00acc1",
		},
		teal: {
			main: "#4db6ac",
		},
		green: {
			main: "#66bb6a",
		},
		lightGreen: {
			main: "#9ccc65",
		},
		lime: {
			main: "#a7e000",
		},
		yellow: {
			main: "#ffd600",
		},
		amber: {
			main: "#ffab00",
		},
		orange: {
			main: "#ffa31a",
		},
		deepOrange: {
			main: "#ff9e80",
		},
		brown: {
			main: "#846c5d",
		},
		blueGray: {
			main: "#3e4e63",
		},
		gray: {
			main: "#878991",
		},
		white: {
			main: "#eeeeee",
		},
		black: {
			main: "#101010",
		},
		dark: {
			main: "#1e1e1b",
		},
		darkBlack: {
			main: "#040407",
		},
		lightDark: {
			main: "#363636",
		},
		lightDarkBright: {
			main: "#464646",
		},
	},
} as ThemeOptions);

const theme = createTheme({
	...baseTheme,
	components: {
		MuiButton: {
			defaultProps: {
				color: "lightDark",
			},
			styleOverrides: {
				root: {
					"&:hover": {
						backgroundColor: baseTheme.palette.lightDarkBright.main,
					},
					"&:disabled": {
						backgroundColor: baseTheme.palette.dark.main,
						color: baseTheme.palette.lightDarkBright.main,
					},
				},
			},
		},
		MuiTooltip: {
			defaultProps: {
				arrow: true,
				placement: "left",
			},
			styleOverrides: {
				tooltip: {
					backgroundColor: baseTheme.palette.darkBlack.main,
				},
				arrow: {
					color: baseTheme.palette.darkBlack.main,
				},
			},
		},
		MuiPopover: {
			styleOverrides: {
				paper: {
					backgroundColor: baseTheme.palette.lightDark.main,
					color: baseTheme.palette.white.main,
				},
			},
		},
		MuiMenuItem: {
			styleOverrides: {
				root: {
					"&:hover": {
						backgroundColor: baseTheme.palette.lightDarkBright.main,
					},
				},
			},
		},
	},
});

export default theme;
