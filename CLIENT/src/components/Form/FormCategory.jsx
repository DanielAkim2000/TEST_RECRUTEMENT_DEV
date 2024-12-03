import { Box, TextField, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectFormCategory,
  setName,
} from "../../redux/slices/formCategory.slice";
import PropTypes from "prop-types";
import useSnackBar from "../../hooks/useSnackBar";
import { useCreateCategoryMutation } from "../../api/slices/category.slice";
import Spinner from "../Spinner";

const FormCategory = (props) => {
  const category = useSelector(selectFormCategory);
  const { name } = category;
  const dispatch = useDispatch();
  const { openSnackbar } = useSnackBar();
  const [createCategory, { isLoading, isSuccess }] =
    useCreateCategoryMutation();

  // État pour suivre si le champ a été touché
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      props.handleClose();
    }
  }, [isSuccess, props, openSnackbar]);

  const checkError = () => {
    // Vérifie si le nom est vide ou trop court
    return !name || name.length < 3 || name.length > 255;
  };

  const hasError = () => touched && checkError();

  const isSubmitDisabled = () => checkError();

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        mt: 2,
      }}
      onSubmit={async (e) => {
        e.preventDefault();
        if (isSubmitDisabled()) {
          openSnackbar(
            "Veuillez vérifier que le nom de la catégorie contient entre 3 et 255 caractères."
          );
        }
        const trimCategory = { name: name.trim() };
        const res = await createCategory(trimCategory);
        if (res?.data?.message) {
          openSnackbar(res.data.message, "success");
        } else {
          openSnackbar(
            "Erreur lors de la création de la catégorie, veuillez réessayer plus tard",
            "error"
          );
        }
      }}
    >
      <TextField
        variant="outlined"
        label="Nom"
        error={hasError()}
        helperText={
          hasError() ? "Le nom doit contenir entre 3 et 255 caractères." : ""
        }
        value={name}
        onFocus={() => setTouched(true)}
        onChange={(e) => dispatch(setName(e.target.value))}
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={isSubmitDisabled()}
      >
        <Spinner isLoading={isLoading} content="Sauvegarder" />
      </Button>
    </Box>
  );
};

FormCategory.propTypes = {
  handleClose: PropTypes.func,
};

export default FormCategory;
