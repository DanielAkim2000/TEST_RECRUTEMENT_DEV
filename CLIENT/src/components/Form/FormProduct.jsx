import React, { useState, useEffect } from "react";
import { Box, TextField, Button } from "@mui/material";
import SelectCategories from "../Select/SelectCategories";
import { useSelector, useDispatch } from "react-redux";
import {
  selectFormProduct,
  setDescription,
  setName,
  setPrice,
} from "../../redux/slices/formProduct.slice";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "../../api/slices/product.slice";
import PropTypes from "prop-types";
import useSnackBar from "../../hooks/useSnackBar";
import Spinner from "../Spinner";

const FormProduct = (props) => {
  const product = useSelector(selectFormProduct);
  const { name, price, description, id } = product;
  const dispatch = useDispatch();
  const { openSnackbar } = useSnackBar();

  const [updateProduct, { isLoading, isSuccess }] = useUpdateProductMutation();
  const [createProduct, { isLoading: isLoadingAdd, isSuccess: isSuccessAdd }] =
    useCreateProductMutation();

  // État pour suivre si l'utilisateur a interagi avec les champs
  const [touched, setTouched] = useState({
    name: false,
    price: false,
    description: false,
  });

  useEffect(() => {
    if (isSuccess || isSuccessAdd) {
      props.handleClose();
    }
  }, [isSuccess, isSuccessAdd, props, openSnackbar]);

  const checkError = (field) => {
    switch (field) {
      case "name":
        return name?.length < 3 || name?.length > 255;
      case "price":
        return price <= 0 || price > 1000000 || !price;
      case "description":
        return description?.length < 3 || description?.length > 1024;
      default:
        return false;
    }
  };

  const hasError = (field) => touched[field] && checkError(field);

  const isSubmitDisabled = () =>
    checkError("name") ||
    checkError("price") ||
    checkError("description") ||
    product.category?.id === 0;

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
          return openSnackbar(
            "Veuillez vérifier les champs du formulaire",
            "error"
          );
        }
        const trimProduct = {
          id,
          name: name.trim(),
          price,
          description: description.trim(),
          category: product.category,
        };
        if (id) {
          const res = await updateProduct(trimProduct);
          if (res?.data?.message) {
            openSnackbar(res.data.message, "success");
          } else {
            openSnackbar(
              "Erreur lors de la modification du produit, veuillez réessayer plus tard",
              "error"
            );
          }
        } else {
          await createProduct(trimProduct);
        }
      }}
    >
      <TextField
        variant="outlined"
        error={hasError("name")}
        helperText={
          hasError("name")
            ? "Le nom doit contenir entre 3 et 255 caractères"
            : ""
        }
        label="Nom"
        value={name}
        onFocus={() => setTouched({ ...touched, name: true })}
        onChange={(e) => dispatch(setName(e.target.value))}
      />
      <TextField
        variant="outlined"
        error={hasError("price")}
        helperText={
          hasError("price")
            ? "Le prix doit être compris entre 0 et 1000000"
            : ""
        }
        label="Prix"
        type="number"
        value={price}
        onFocus={() => setTouched({ ...touched, price: true })}
        onChange={(e) => dispatch(setPrice(parseFloat(e.target.value)))}
      />
      <TextField
        multiline
        error={hasError("description")}
        helperText={
          hasError("description")
            ? "La description doit contenir entre 3 et 1024 caractères"
            : ""
        }
        rows={4}
        variant="outlined"
        label="Description"
        value={description}
        onFocus={() => setTouched({ ...touched, description: true })}
        onChange={(e) => dispatch(setDescription(e.target.value))}
      />
      <SelectCategories />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={isSubmitDisabled()}
      >
        {id ? (
          <Spinner isLoading={isLoading} content="Modifier" />
        ) : (
          <Spinner isLoading={isLoadingAdd} content="Ajouter" />
        )}
      </Button>
    </Box>
  );
};

FormProduct.propTypes = {
  handleClose: PropTypes.func,
};

export default FormProduct;
