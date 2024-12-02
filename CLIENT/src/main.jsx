import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./api/store.js";
import "./index.css";
import "@fontsource/nunito";
import "@fontsource/nunito/300.css";
import "@fontsource/nunito/400.css";
import "@fontsource/nunito/500.css";
import "@fontsource/nunito/700.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme.jsx";
import SnackbarContextProvider from "./context/Provider/snackbar.provider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarContextProvider>
          <App />
        </SnackbarContextProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
