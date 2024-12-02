import React from "react";
import { Box, Modal, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import BtnEffectInverseHover from "./BtnEffectInverseHover";
import FormCategory from "../Form/FormCategory";
import { resetFormCategory } from "../../redux/slices/formCategory.slice";

const ButtonAdCategory = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    const timer = setTimeout(() => {
      dispatch(resetFormCategory());
    }, 500);

    return () => clearTimeout(timer);
  };

  return (
    <>
      <BtnEffectInverseHover onClick={handleOpen} color="slate-main">
        Ajouter une catégorie
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
            Ajouter une catégorie
          </Typography>
          <FormCategory handleClose={handleClose} />
        </Box>
      </Modal>
    </>
  );
};

export default ButtonAdCategory;
