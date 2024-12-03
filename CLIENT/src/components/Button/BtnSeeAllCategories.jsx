import React, { useCallback, useEffect, useRef, useState } from "react";
import BtnEffectInverseHover from "./BtnEffectInverseHover";
import {
  Box,
  Button,
  CircularProgress,
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
import {
  selectData,
  selectLimit,
  selectOffset,
  setData,
  setOffset,
} from "../../redux/slices/scrollInifinite.slice";

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
    const trimCategory = {
      name: formCategory.name.trim(),
      id: formCategory.id,
    };
    const res = await updateCategory(trimCategory);
    if (res?.data?.message) {
      openSnackbar(res.data.message, res.data.severity);
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
      openSnackbar(res.data.message, res.data.severity);
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
              formCategory?.name?.length < 3 ||
              formCategory?.name?.length >= 255
                ? null
                : handleSubmit
            }
            disabled={
              formCategory?.name?.length < 3 ||
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

// Votre composant de ligne

const BtnSeeAllCategories = () => {
  const [open, setOpen] = useState(false);
  const categoriesState = useSelector(selectData);
  // const [offset, setOffset] = useState(0); // Offset pour la pagination
  const offset = useSelector(selectOffset);
  const limit = useSelector(selectLimit);
  const dispatch = useDispatch();
  // const [limit] = useState(20); // Limite de catégories par fetch
  const [loading, setLoading] = useState(false); // État de chargement
  const [hasMore, setHasMore] = useState(true); // S'il y a encore des catégories à charger
  const [debounceTimer, setDebounceTimer] = useState(null); // Timer pour le debounce du scroll
  const scrollRef = useRef(null);
  const [prevOffset, setPrevOffset] = useState(null);

  // fonction pour récupérer les catégories via l'API
  const fetchMoreData = useCallback(async () => {
    if (loading || !hasMore) return;
    if (prevOffset >= offset && prevOffset) return; // Vérifier si l'offset a changé
    setLoading(true); // Activer le chargement
    const res = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/api/categories/scrollInfinite?offset=${offset}&limit=${limit}`
    );
    const data = await res.json();
    console.log(data);
    setPrevOffset(offset); // mettre à jour l'offset précédent
    if (data.length === 0) {
      setHasMore(false); // désactiver le chargement s'il n'y a pas de nouvelles
    } else if (data.map((item) => item.id).includes(categoriesState[0]?.id)) {
      setHasMore(false); // désactiver le chargement s'il n'y a pas de nouvelles données
    } else {
      dispatch(setData(data)); // mettre à jour les catégories
      // setOffset((prev) => prev + limit); // mettre à jour l'offset
      dispatch(setOffset(offset + limit)); // mettre à jour l'offset
    }
    setLoading(false); // désactiver le chargement
  }, [prevOffset, offset, limit, loading, hasMore, categoriesState, dispatch]);

  // gestion du défilement infini
  const handleScroll = useCallback(() => {
    if (!scrollRef.current || loading || !hasMore) return;

    const threshold = 0; // seuil de déclenchement du fetch
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;

    if (clientHeight + scrollTop + threshold >= scrollHeight) {
      if (debounceTimer) {
        clearTimeout(debounceTimer); // annuler l'ancien timer
        setLoading(true); // activer le chargement
        scrollRef.current.scrollTo = scrollHeight; // scroller en bas
      }

      const newTimer = setTimeout(() => {
        fetchMoreData(); // appeler fetchMoreData après un délai
      }, 500); // délai de 500ms pour limiter les appels
      setDebounceTimer(newTimer);
    }
  }, [fetchMoreData, loading, hasMore, debounceTimer]);

  // effet pour charger les données initiales lors de l'ouverture de la modal
  useEffect(() => {
    if (open && categoriesState.length === 0) {
      fetchMoreData();
    }
  }, [open, fetchMoreData, categoriesState]);

  // ouverture de la modal
  const handleOpen = () => {
    setOpen(true);
  };

  // fermeture de la modal
  const handleClose = () => {
    setOpen(false);
    if (debounceTimer) {
      clearTimeout(debounceTimer); // arrêter le debounce si la modal est fermée
    }
  };

  return (
    <>
      <BtnEffectInverseHover color="slate-main" onClick={handleOpen}>
        Voir toutes les catégories
      </BtnEffectInverseHover>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          ref={scrollRef}
          onScroll={handleScroll}
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
            maxHeight: "80vh", // pour limiter la hauteur
            overflowY: "scroll",
          }}
        >
          <div className="flex justify-between mb-5">
            <Typography
              variant="h5"
              align="center"
              marginX="auto"
              fontWeight="bold"
              sx={{ color: "primary.main" }}
            >
              Liste des catégories
            </Typography>
          </div>

          <div className="flex justify-between w-full border-b py-1">
            <Stack direction="row" spacing={2} alignItems="center">
              <span className="font-bold">#</span>
              <span className="font-bold">Nom</span>
            </Stack>
            <span className="font-bold">Actions</span>
          </div>

          {categoriesState.map((category, index) => (
            <RenderRow key={index} index={index} data={categoriesState} />
          ))}

          {loading && (
            <div className="flex justify-center mt-5">
              <CircularProgress
                sx={{
                  color: "orange.main",
                }}
              />
            </div>
          )}

          {!hasMore && (
            <Typography
              variant="h6"
              align="center"
              marginX="auto"
              fontWeight="bold"
              margin={2}
              sx={{ color: "primary.main" }}
            >
              Vous avez atteint la fin de la liste
            </Typography>
          )}
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
