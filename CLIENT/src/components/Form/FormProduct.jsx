import React, { useState, useCallback } from "react";
import { Box, Button, TextField } from "@mui/material";
import SelectCategories from "../Select/SelectCategories";
import { useSelector, useDispatch } from "react-redux";
import {
  selectFormProduct,
  setName,
  setPrice,
  setDescription,
} from "../../redux/slices/formProduct.slice";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "../../api/slices/product.slice";
import PropTypes from "prop-types";
import Spinner from "../Spinner";
import useSnackbar from "../../hooks/useSnackBar";

const regexTEXT = /^[a-zA-Z0-9\s]*$/;
const regexNUMBER = /^[0-9]*$/;
const regexFLOAT = /^[0-9.,]*$/;

const FormProduct = ({ handleClose }) => {
  const product = useSelector(selectFormProduct);
  const { name = "", price = 0, description = "", id } = product || {};
  const dispatch = useDispatch();
  const { openSnackbar } = useSnackbar();

  const [helperText, setHelperText] = useState({
    name: [],
    price: [],
    description: [],
  });

  const [updateProduct, { isLoading, isSuccess }] = useUpdateProductMutation();
  const [createProduct, { isLoading: isLoadingAdd, isSuccess: isSuccessAdd }] =
    useCreateProductMutation();

  const [touched, setTouched] = useState({
    name: false,
    price: false,
    description: false,
  });

  const validateField = useCallback((field, value) => {
    const errors = [];
    switch (field) {
      case "name":
        if (value?.length < 3)
          errors.push("Le nom doit contenir au moins 3 caractères");
        if (value?.length > 255)
          errors.push("Le nom doit contenir au maximum 255 caractères");
        if (!regexTEXT.test(value))
          errors.push("Le nom ne doit pas contenir de caractères spéciaux");
        break;

      case "price":
        if (value <= 0) errors.push("Le prix doit être supérieur à 0");
        if (!regexFLOAT.test(value?.toString()))
          errors.push("Le prix doit être un nombre valide");
        break;

      case "description":
        if (value?.length < 10)
          errors.push("La description doit contenir au moins 10 caractères");
        if (value?.length > 1000)
          errors.push(
            "La description doit contenir au maximum 1000 caractères"
          );
        break;

      default:
        break;
    }
    return errors;
  }, []);

  const hasError = useCallback(
    (field) => {
      if (!touched[field]) {
        if (!id) return false;
      }
      const errors = validateField(field, product[field]);
      return errors?.length > 0;
    },
    [touched, validateField, product, id]
  );

  const isSubmitDisabled = () => {
    return (
      hasError("name") ||
      hasError("price") ||
      hasError("description") ||
      product?.category?.id === 0
    );
  };

  const verifyErrors = async (violations) => {
    setHelperText({
      name: [],
      price: [],
      description: [],
    });

    const violationsGrouped = violations.reduce(
      (acc, violation) => {
        const { propertyPath, title } = violation;

        if (propertyPath === "name") acc.name.push(title);
        if (propertyPath === "price") acc.price.push(title);
        if (propertyPath === "description") acc.description.push(title);

        return acc;
      },
      {
        name: [],
        price: [],
        description: [],
      }
    );
    console.log("violationsGrouped", violationsGrouped);

    setHelperText({
      name: violationsGrouped.name,
      price: violationsGrouped.price,
      description: violationsGrouped.description,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitDisabled()) {
      return openSnackbar(
        "Veuillez vérifier les champs du formulaire",
        "error"
      );
    }

    const trimmedProduct = {
      id,
      name: name.trim(),
      price,
      description: description.trim(),
      category: product?.category,
    };

    if (id) {
      const res = await updateProduct(trimmedProduct);
      if (res?.data) {
        openSnackbar(res.data.message, res.data.severity);
        handleClose();
      }
      if (res?.error?.data) {
        verifyErrors(res.error.data.violations);
      }
      if (res?.error.data?.message) {
        openSnackbar(res.data.message, res.data.severity);
      }
    } else {
      const res = await createProduct(trimmedProduct);
      if (res?.data?.message) {
        openSnackbar(res.data.message, res.data.severity);
      } else {
        openSnackbar("Erreur lors de la création du produit", "error");
      }
    }
  };

  return (
    <Box
      component="form"
      sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
    >
      <TextField
        variant="outlined"
        error={hasError("name")}
        helperText={touched.name && helperText?.name?.join(", ")}
        label="Nom"
        value={name}
        onFocus={() => setTouched((prev) => ({ ...prev, name: true }))}
        onChange={(e) => {
          const newValue = e.target.value;
          dispatch(setName(newValue));
          setHelperText((prev) => ({
            ...prev,
            name: validateField("name", newValue),
          }));
        }}
      />
      <TextField
        variant="outlined"
        error={hasError("price")}
        helperText={touched.price && helperText.price?.join(", ")}
        label="Prix"
        type="number"
        value={price}
        onFocus={() => setTouched((prev) => ({ ...prev, price: true }))}
        onChange={(e) => {
          const newValue = e.target.value;
          dispatch(setPrice(newValue));
          setHelperText((prev) => ({
            ...prev,
            price: validateField("price", newValue),
          }));
        }}
      />
      <TextField
        multiline
        error={hasError("description")}
        helperText={
          helperText?.description?.length > 0 &&
          helperText?.description?.join(", ")
        }
        rows={4}
        variant="outlined"
        label="Description"
        value={description}
        onFocus={() => setTouched((prev) => ({ ...prev, description: true }))}
        onChange={(e) => {
          const newValue = e.target.value;
          dispatch(setDescription(newValue));
          setHelperText((prev) => ({
            ...prev,
            description: validateField("description", newValue),
          }));
        }}
      />
      <SelectCategories />
      <Button
        variant="contained"
        sx={{
          backgroundColor: id ? "orange.main" : "primary.main",
          color: "white",
          "&:hover": { backgroundColor: id ? "orange.dark" : "primary.dark" },
        }}
        onClick={handleSubmit}
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
  handleClose: PropTypes.func.isRequired,
};

export default FormProduct;
