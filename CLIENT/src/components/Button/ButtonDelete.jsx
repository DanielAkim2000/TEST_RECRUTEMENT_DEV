import React from "react";
import BtnEffectHover from "./BtnEffectHover";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import { useDeleteProductMutation } from "../../api/slices/product.slice";
import useSnackBar from "../../hooks/useSnackBar";
import PropTypes from "prop-types";
import Spinner from "../Spinner";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ButtonDelete = ({ product }) => {
  const [open, setOpen] = React.useState(false);
  const { openSnackbar } = useSnackBar();
  const [deleteProduct, { isSuccess, isError, isLoading }] =
    useDeleteProductMutation();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    const res = await deleteProduct(product.id);
    if (res?.data?.message) {
      openSnackbar(res.data.message, res.data.severity);
    } else {
      openSnackbar("Erreur lors de la suppression du produit", "error");
    }
    setOpen(false);
  };

  // useEffect(() => {
  //   if (isSuccess) {
  //     openSnackbar("Produit supprimé avec succès", "success");
  //   }
  //   if (isError) {
  //     openSnackbar("Erreur lors de la suppression du produit", "error");
  //   }
  // }, [isSuccess, isError, openSnackbar]);
  return (
    <>
      <BtnEffectHover onClick={handleClickOpen} color="red-main">
        Supprimer
      </BtnEffectHover>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Voulez vous vraiment supprimer ce produit ?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            La suppression de ce produit est irréversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={handleDelete} className="!text-red-500">
            <Spinner isLoading={isLoading} content={"Supprimer"} />
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

ButtonDelete.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ButtonDelete;
