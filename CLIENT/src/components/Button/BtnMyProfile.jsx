import { Box, MenuItem, Modal, Typography } from "@mui/material";
import React from "react";
import FormLogin from "../Form/FormLogin";
import PropTypes from "prop-types";
import {
  setEmail,
  setFirstName,
  setType,
  setPassword,
  setName,
  setNewPassword,
} from "../../redux/slices/formLogin.slice";
import { useDispatch } from "react-redux";
import { useMeQuery } from "../../api/slices/authSlice";
import { setUser } from "../../redux/slices/auth.slice";

const BtnMyProfile = ({ handleCloseModal }) => {
  const [open, setOpen] = React.useState(false);
  const { data: user, isLoading } = useMeQuery();

  console.log("user", user);
  const dispatch = useDispatch();
  const handleOpen = () => {
    setOpen(true);
    dispatch(setType("info"));
    dispatch(setFirstName(user?.prenom));
    dispatch(setName(user?.nom));
    dispatch(setEmail(user?.email));
    dispatch(setPassword(""));
    dispatch(setNewPassword(""));
    dispatch(setUser(user));
    handleCloseModal();
  };

  const handleClose = () => {
    dispatch(setType("login"));
    dispatch(setFirstName(""));
    dispatch(setName(""));
    dispatch(setEmail(""));
    dispatch(setPassword(""));
    dispatch(setNewPassword(""));
    handleCloseModal();
    setOpen(false);
  };

  if (!isLoading) {
    return (
      <>
        <MenuItem onClick={handleOpen}>Modifier mes infos</MenuItem>
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
              {" "}
              Modifier mes infos
            </Typography>
            <FormLogin handleCloseInfo={handleClose} />
          </Box>
        </Modal>
      </>
    );
  }
  return null;
};

BtnMyProfile.propTypes = {
  handleCloseModal: PropTypes.func,
};

export default BtnMyProfile;
