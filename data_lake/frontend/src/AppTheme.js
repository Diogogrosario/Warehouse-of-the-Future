import { createTheme } from "@mui/material/styles";
import darkScrollbar from "@mui/material/darkScrollbar";

const theme = createTheme({
    palette: {
        mode: "dark",
    },
    typography: {
        fontFamily: ["Poppins", "Roboto", "sans-serif"].join(","),
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: darkScrollbar(),
            },
        },
    },
});

export default theme;
