import { createTheme } from "@mui/material";

const theme = createTheme({
  fontFamily: "'Nunito', sans-serif",
  palette: {
    primary: {
      main: "#007bff",
    },
    secondary: {
      main: "#6c757d",
    },
    orange: {
      main: "#fd7e14",
    },
    success: {
      main: "#28a745",
    },
    info: {
      main: "#17a2b8",
    },
    warning: {
      main: "#ffc107",
    },
    danger: {
      main: "#dc3545",
    },
    light: {
      main: "#f8f9fa",
    },
    dark: {
      main: "#343a40",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "'Nunito', sans-serif",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontFamily: "'Nunito', sans-serif",
          borderRadius: 10,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "'Nunito', sans-serif",
          borderRadius: 50,
          fontWeight: "bold",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          fontFamily: "'Nunito', sans-serif",
          borderRadius: 10,
        },
      },
    },
  },
});

export default theme;
