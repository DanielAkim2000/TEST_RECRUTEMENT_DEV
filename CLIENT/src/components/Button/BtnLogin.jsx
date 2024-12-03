import { Box, Modal, Typography } from "@mui/material";
import React from "react";
import IconButton from "@mui/material/IconButton";
import FormLogin from "../Form/FormLogin";
import LoginIcon from "@mui/icons-material/Login";

const BtnLogin = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <IconButton size="large" color="inherit" onClick={handleOpen}>
      <LoginIcon />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: {
              xs: "90%",
              sm: "50%",
              lg: "30%",
            },
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 5,
            p: 4,
          }}
        >
          <Typography
            variant="h5"
            align="center"
            fontWeight="bold"
            marginBottom={3}
            sx={{ color: "primary.main" }}
          >
            Ajouter une catégorie
          </Typography>
          <FormLogin handleClose={handleClose} />
        </Box>
      </Modal>
    </IconButton>
  );
};

export default BtnLogin;
