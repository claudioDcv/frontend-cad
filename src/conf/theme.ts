
import { createTheme } from "@mui/material";
const theme = createTheme({
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
    },
    palette: {
        primary: {
            main: '#648fbeff',
            light: '#9dbedfff',
            dark: '#3f6f9f',
        },
        secondary: {
            main: '#4774a5ff',
            light: '#7aa2c4ff',
            dark: '#004b6dff',
        },
        background: {
            default: '#b2c6d4ff',
            paper: '#ffffffff',
        },
        text: {
            primary: '#000000ff',
            secondary: '#555555ff',
        },
    },
});

export default theme;