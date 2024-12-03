import { Box, Modal, Typography } from "@mui/material";
import React from "react";
import IconButton from "@mui/material/IconButton";
import FormLogin from "../Form/FormLogin";
import LoginIcon from "@mui/icons-material/Login";
import {
  selectIsOpenFormLogin,
  setOpenFormLogin,
  handleClose as handleCloseFormLogin,
  selectType,
} from "../../redux/slices/formLogin.slice";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../redux/slices/auth.slice";

const BtnLogin = () => {
  const type = useSelector(selectType);
  const open = useSelector(selectIsOpenFormLogin);
  const isAuth = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();
  const handleOpen = () => {
    dispatch(setOpenFormLogin(true));
  };

  const handleClose = () => {
    dispatch(handleCloseFormLogin());
  };

  const renderTitle = () => {
    if (type === "login") {
      return "Connexion";
    }
    return "Créer un compte";
  };

  if (!isAuth) {
    return (
      <>
        <IconButton size="large" color="inherit" onClick={handleOpen}>
          <LoginIcon />
        </IconButton>
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
              {renderTitle()}
            </Typography>
            <FormLogin />
          </Box>
        </Modal>
      </>
    );
  }
  return null;
};

export default BtnLogin;
