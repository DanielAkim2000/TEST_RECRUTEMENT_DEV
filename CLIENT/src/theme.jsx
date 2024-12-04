import { createTheme } from "@mui/material";

const theme = createTheme({
  fontFamily: "'Nunito', sans-serif",
  palette: {
    severity: {
      success: {
        main: "#28a745",
      },
      error: {
        main: "#dc3545",
      },
      warning: {
        main: "#ffc107",
      },
      info: {
        main: "#17a2b8",
      },
    },
    primary: {
      main: "#007bff",
      dark: "#0056b3",
    },
    secondary: {
      main: "#6c757d",
    },
    orange: {
      main: "#fd7e14",
      dark: "#ff6b00",
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
