import React, { useEffect, useState } from "react";
import BtnEffectInverseHover from "./BtnEffectInverseHover";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  ListItem,
  ListItemText,
  Modal,
  Slide,
  Stack,
} from "@mui/material";
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
} from "../../api/slices/category.slice";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { useDispatch, useSelector } from "react-redux";
import {
  resetFormCategory,
  selectFormCategory,
  setFormCategory,
  setName,
} from "../../redux/slices/formCategory.slice";
import PropTypes from "prop-types";
import useSnackBar from "../../hooks/useSnackBar";
import Spinner from "../Spinner";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const RenderRow = (props) => {
  const { index, data } = props;
  const [edit, setEdit] = useState(false);
  const formCategory = useSelector(selectFormCategory);
  const [open, setOpen] = React.useState(false);

  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();
  const dispatch = useDispatch();
  const { openSnackbar } = useSnackBar();
  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();

  const handleEdit = () => {
    // pour empêcher la modification de plusieurs catégories en même temps
    if (formCategory.name !== "") {
      return;
    }
    setEdit(true);
    dispatch(setFormCategory(data[index]));
  };

  const handleSubmit = async () => {
    const res = await updateCategory(formCategory);
    if (res?.data?.status === "Categorie mise à jour") {
      openSnackbar("Catégorie modifiée avec succès");
    }
    setEdit(false);
    dispatch(resetFormCategory());
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleDelete = async () => {
    const res = await deleteCategory(data[index]?.id);
    if (res?.data?.status === "Categorie supprimée") {
      openSnackbar("Catégorie supprimée avec succès");
      handleClose();
    }
  };

  useEffect(() => {
    // au cas ou il y aun scroll le formulaire de modification reste visible
    if (formCategory?.id === data[index]?.id && formCategory?.name !== "") {
      setEdit(true);
    }
  }, [formCategory, data, index]);

  return (
    <ListItem
      key={index}
      component="div"
      secondaryAction={
        <ListItem>
          {!edit && (
            <IconButton onClick={handleEdit}>
              <CreateIcon />
            </IconButton>
          )}
          {edit && (
            <IconButton onClick={handleSubmit}>
              <Spinner isLoading={isUpdating} content={<SaveAsIcon />} />
            </IconButton>
          )}
          <IconButton onClick={handleOpen}>
            <DeleteIcon />
          </IconButton>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>
              Voulez vous vraiment supprimer cette catégorie ?
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                La suppression de cette catégorie est irréversible.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Annuler</Button>
              <Button onClick={handleDelete} className="!text-red-500">
                <Spinner isLoading={isDeleting} content="Supprimer" />
              </Button>
            </DialogActions>
          </Dialog>
        </ListItem>
      }
    >
      <Stack direction="row" spacing={2} alignItems={"center"} padding={0}>
        <span className="font-bold">{data[index]?.id}</span>
        {!edit && <ListItemText primary={`${data[index]?.name}`} />}
        {edit && (
          <input
            className="border-b w-auto p-1 rounded-2xl"
            autoFocus
            value={formCategory.name}
            onChange={(e) => {
              dispatch(setName(e.target.value));
            }}
          />
        )}
      </Stack>
    </ListItem>
  );
};

const BtnSeeAllCategories = () => {
  const [open, setOpen] = React.useState(false);
  const { data: categories, isLoading, isError } = useGetCategoriesQuery();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <BtnEffectInverseHover color="slate-main" onClick={handleOpen}>
        Voir toutes les catégories
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
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 5,
            p: 4,
          }}
        >
          {/* <FixedSizeList
            height={400}
            width={360}
            itemSize={40}
            itemCount={categories?.length}
            overscanCount={5}
            itemData={categories}
          >
            {RenderRow}
          </FixedSizeList> */}
          <div className="max-w-[360px] max-h-[400px] overflow-hidden overflow-y-auto">
            {categories?.map((category, index) => (
              <RenderRow key={index} index={index} data={categories} />
            ))}
          </div>
        </Box>
      </Modal>
    </>
  );
};

RenderRow.propTypes = {
  index: PropTypes.number,
  style: PropTypes.object,
  data: PropTypes.array,
};

export default BtnSeeAllCategories;
