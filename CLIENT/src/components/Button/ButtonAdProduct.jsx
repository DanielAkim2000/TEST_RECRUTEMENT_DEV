import React from "react";
import { Box, Modal, Typography } from "@mui/material";
import FormProduct from "../Form/FormProduct";
import { useDispatch } from "react-redux";
import { resetFormProduct } from "../../redux/slices/formProduct.slice";
import BtnEffectHover from "./BtnEffectHover";

const ButtonAdProduct = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    dispatch(resetFormProduct());
  };

  return (
    <>
      <BtnEffectHover onClick={handleOpen} color="primary-main">
        Ajouter un produit
      </BtnEffectHover>
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
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 5,
            p: 4,
          }}
        >
          <Typography variant="h5">Ajouter un produit</Typography>
          <FormProduct handleClose={handleClose} />
        </Box>
      </Modal>
    </>
  );
};

export default ButtonAdProduct;
