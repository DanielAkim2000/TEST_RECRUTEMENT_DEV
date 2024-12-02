import { Box, TextField, Button } from "@mui/material";
import React, { useEffect } from "react";
import SelectCategories from "../Select/SelectCategories";
import { useSelector } from "react-redux";
import {
  selectFormProduct,
  setDescription,
  setName,
  setPrice,
} from "../../redux/slices/formProduct.slice";
import { useDispatch } from "react-redux";
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
  const [updateProduct, { isLoading, isError, isSuccess, error }] =
    useUpdateProductMutation();
  const [
    createProduct,
    { isLoading: isLoadingAdd, isError: isErrorAdd, isSuccess: isSuccessAdd },
  ] = useCreateProductMutation();

  useEffect(() => {
    if (isSuccess || isSuccessAdd) {
      props.handleClose();
      openSnackbar("success", "Produit sauvegardé avec succès");
    }
  }, [isSuccess, isSuccessAdd, props, openSnackbar]);

  console.log("product", product);
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
        if (id) {
          const res = await updateProduct(product);
          console.log("res", res);
          console.log("error", error);
        } else {
          const res = await createProduct(product);
          console.log(res);
          console.log("error", error);
        }
      }}
    >
      <TextField
        variant="outlined"
        label="Nom"
        value={name}
        onChange={(e) => dispatch(setName(e.target.value))}
      />
      <TextField
        variant="outlined"
        label="Prix"
        type="number"
        value={price}
        onChange={(e) => dispatch(setPrice(parseFloat(e.target.value)))}
      />
      <TextField
        multiline
        rows={4}
        variant="outlined"
        label="Description"
        value={description}
        onChange={(e) => dispatch(setDescription(e.target.value))}
      />
      <SelectCategories />
      <Button variant="contained" color="primary" type="submit">
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
