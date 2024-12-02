import { Box, TextField, Button } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  selectFormCategory,
  setName,
} from "../../redux/slices/formCategory.slice";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import useSnackBar from "../../hooks/useSnackBar";
import { useCreateCategoryMutation } from "../../api/slices/category.slice";

const FormCategory = (props) => {
  const category = useSelector(selectFormCategory);
  const { name } = category;
  const dispatch = useDispatch();
  const { openSnackbar } = useSnackBar();
  const [createCategory, { isLoading, isError, isSuccess, error }] =
    useCreateCategoryMutation();

  useEffect(() => {
    if (isSuccess) {
      props.handleClose();
      openSnackbar("Catégorie sauvegardée avec succès", "success");
    }
  }, [isSuccess, props, openSnackbar]);

  console.log("category", category);
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
        const res = await createCategory(category);
        console.log(res);
        console.log("error", error);
      }}
    >
      <TextField
        variant="outlined"
        label="Nom"
        value={name}
        onChange={(e) => dispatch(setName(e.target.value))}
      />
      <Button variant="contained" color="primary" type="submit">
        Ajouter
      </Button>
    </Box>
  );
};

FormCategory.propTypes = {
  handleClose: PropTypes.func,
};

export default FormCategory;
