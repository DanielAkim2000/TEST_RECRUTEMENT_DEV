import { Box, Modal, Typography } from "@mui/material";
import React from "react";
import FormProduct from "../Form/FormProduct";
import { useDispatch, useSelector } from "react-redux";
import { resetFormProduct } from "../../redux/slices/formProduct.slice";
import PropTypes from "prop-types";
import BtnEffectHover from "./BtnEffectHover";
import { selectIsAuthenticated } from "../../redux/slices/auth.slice";
import { setOpenFormLogin } from "../../redux/slices/formLogin.slice";

const ButtonModify = (props) => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuthenticated);
  const [open, setOpen] = React.useState(false);
  const handleOpen = async () => {
    if (!isAuth) {
      return dispatch(setOpenFormLogin(true));
    } else {
      setOpen(true);
    }
  };
  const handleClose = () => {
    setOpen(false);
    const timer = setTimeout(() => {
      dispatch(resetFormProduct());
    }, 500);

    return () => clearTimeout(timer);
  };

  return (
    <>
      <BtnEffectHover onClick={handleOpen} color="orange-main">
        Modifier
      </BtnEffectHover>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description "
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
            Modifier le produit
          </Typography>
          <FormProduct handleClose={handleClose} />
        </Box>
      </Modal>
    </>
  );
};

ButtonModify.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ButtonModify;
