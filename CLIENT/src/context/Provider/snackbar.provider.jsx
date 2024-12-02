//snackbar context
import { Snackbar } from "@mui/material";
import { useState } from "react";
import { SnackbarContext } from "../snackbar.context";

const SnackbarContextProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const openSnackbar = (message) => {
    setMessage(message);
    setOpen(true);
  };

  const closeSnackbar = () => {
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ openSnackbar, closeSnackbar }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={closeSnackbar}
        message={message}
      />
    </SnackbarContext.Provider>
  );
};

export default SnackbarContextProvider;
