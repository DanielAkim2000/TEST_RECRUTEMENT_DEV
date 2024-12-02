import { Box, Modal, Typography } from "@mui/material";
import React from "react";
import FormProduct from "../Form/FormProduct";
import { useDispatch } from "react-redux";
import { resetFormProduct } from "../../redux/slices/formProduct.slice";
import PropTypes from "prop-types";
import BtnEffectHover from "./BtnEffectHover";

const ButtonModify = (props) => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    props.onClick();
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    dispatch(resetFormProduct());
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
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 5,
            p: 4,
          }}
        >
          <Typography variant="h5">Modifier le produit</Typography>
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
