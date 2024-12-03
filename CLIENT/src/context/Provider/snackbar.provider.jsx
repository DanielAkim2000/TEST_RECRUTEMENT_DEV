import { Snackbar, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { SnackbarContext } from "../snackbar.context";
import PropTypes from "prop-types";

const StyledSnackbar = styled(Snackbar)(({ theme, severity }) => ({
  "& .MuiSnackbarContent-root": {
    backgroundColor:
      theme.palette[severity]?.main || theme.palette.success.main, // fallback to success if severity is undefined
    color: theme.palette.common.white,
  },
}));

const SnackbarContextProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const openSnackbar = (message, severity = "success") => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  const closeSnackbar = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        closeSnackbar();
      }, 4000);
    }
  }, [open]);

  return (
    <SnackbarContext.Provider value={{ openSnackbar, closeSnackbar }}>
      {children}
      <StyledSnackbar
        open={open}
        autoHideDuration={5000}
        onClose={closeSnackbar}
        message={message}
        severity={severity} // Pass severity as prop to StyledSnackbar
      />
    </SnackbarContext.Provider>
  );
};

SnackbarContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SnackbarContextProvider;
