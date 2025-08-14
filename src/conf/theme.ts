
import { createTheme } from "@mui/material";
const theme = createTheme({
    palette: {
        primary: {
            main: '#648fbeff',
            light: '#9dbedfff',
            dark: '#3f6f9f',
        },
        secondary: {
            main: '#022c8eff',
            light: '#355cafff',
            dark: '#001f3dff',
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