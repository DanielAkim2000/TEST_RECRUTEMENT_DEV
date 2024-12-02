import React from "react";
import { Box, Modal, Typography } from "@mui/material";
import FormProduct from "../Form/FormProduct";
import { useDispatch } from "react-redux";
import { resetFormProduct } from "../../redux/slices/formProduct.slice";
import BtnEffectInverseHover from "./BtnEffectInverseHover";

const ButtonAdProduct = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
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
      <BtnEffectInverseHover onClick={handleOpen} color="primary-main">
        Ajouter un produit
      </BtnEffectInverseHover>
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
            Ajouter un produit
          </Typography>
          <FormProduct handleClose={handleClose} />
        </Box>
      </Modal>
    </>
  );
};

export default ButtonAdProduct;
