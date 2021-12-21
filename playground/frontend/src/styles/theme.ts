import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#212121',
    },
    secondary: {
      main: '#3f51b5',
    },
    error: {
      main: '#ff1744',
    },
    warning: {
      main: '#ffb300',
    },
    info: {
      main: '#039be5',
    },
    success: {
      main: '#4caf50',
    },
  },
});

export default theme;