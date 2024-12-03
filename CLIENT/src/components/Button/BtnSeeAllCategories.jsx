import React, { useState } from "react";
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
  ListItemText,
  Modal,
  Slide,
  Stack,
  TextField,
  Typography,
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

// fonction pour afficher les categories
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
    dispatch(setFormCategory(data[index]));
    setEdit(true);
  };

  const handleSubmit = async () => {
    const res = await updateCategory(formCategory);
    if (res?.data?.message) {
      openSnackbar(res.data.message, "success");
    } else {
      openSnackbar(
        "Erreur lors de la modification de la catégorie, veuillez réessayer plus tard",
        "error"
      );
    }
    setEdit(false);
    /**j ai rajoute le setTimeout le temps que setEdit(false) soit pris en compte et que le formulaire
     *soit bien caché sinon le dispatch se fait et vu que le form est touche et
     *et reintialise l erreur de longueur du nom apparait vu que le nom est vide ""
     */
    const timer = setTimeout(() => {
      dispatch(resetFormCategory());
    }, 500);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleDelete = async () => {
    const res = await deleteCategory(data[index]?.id);
    if (res?.data?.message) {
      openSnackbar(res.data.message, "success");
      handleClose();
    } else {
      openSnackbar(
        "Erreur lors de la suppression de la catégorie, veuillez réessayer plus tard",
        "error"
      );
      handleClose();
    }
  };

  return (
    <div className="flex justify-between w-full border-b py-1">
      <Stack
        direction="row"
        spacing={2}
        alignItems={"center"}
        padding={0}
        justifyItems={"center"}
      >
        <span className="font-bold">{data[index]?.id}</span>
        {!edit && <ListItemText primary={`${data[index]?.name}`} />}
        {edit && (
          <TextField
            className="border-b w-auto p-1 rounded-2xl"
            autoFocus
            size="small"
            sx={{
              width: {
                xs: "90%",
                sm: "50%",
                lg: "30%",
              },
            }}
            error={
              formCategory?.name?.length < 3 ||
              formCategory?.name?.length >= 255
            }
            helperText={
              formCategory?.name?.length < 3 ||
              formCategory?.name?.length >= 255
                ? "Le nom doit contenir entre 3 et 255 caractères"
                : ""
            }
            value={formCategory?.name}
            onChange={(e) => {
              dispatch(setName(e.target.value));
            }}
          />
        )}
      </Stack>
      <div className="flex gap-2 ml-auto">
        {!edit && (
          <IconButton onClick={handleEdit}>
            <CreateIcon
              sx={{
                color: "primary.main",
              }}
            />
          </IconButton>
        )}
        {edit && (
          <IconButton
            onClick={
              formCategory?.name?.length <= 3 ||
              formCategory?.name?.length >= 255
                ? null
                : handleSubmit
            }
            disabled={
              formCategory?.name?.length <= 3 ||
              formCategory?.name?.length >= 255
            }
          >
            <Spinner
              isLoading={isUpdating}
              content={
                <SaveAsIcon
                  sx={{
                    color: "orange.main",
                  }}
                />
              }
            />
          </IconButton>
        )}
        <IconButton onClick={handleOpen}>
          <DeleteIcon
            sx={{
              color: "danger.main",
            }}
          />
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
      </div>
    </div>
  );
};

// button pour voir toutes les categories
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
            width: {
              xs: "90%",
              sm: "50%",
            },
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
          <div className="max-h-[400px] overflow-hidden overflow-y-auto min-w-full">
            <div className="flex justify-between mb-5">
              <Typography
                variant="h5"
                align="center"
                marginX={"auto"}
                fontWeight={"bold"}
                sx={{
                  color: "primary.main",
                }}
              >
                Liste des catégories
              </Typography>
            </div>

            <div className="flex justify-between w-full border-b py-1">
              <Stack direction="row" spacing={2} alignItems={"center"}>
                <span className="font-bold">#</span>
                <span className="font-bold">Nom</span>
              </Stack>
              <span className="font-bold">Actions</span>
            </div>
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
