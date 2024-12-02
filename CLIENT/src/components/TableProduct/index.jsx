import React from "react";
import ButtonDelete from "../Button/ButtonDelete";
import ButtonModify from "../Button/ButtonModify";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useGetProductsQuery } from "../../api/slices/product.slice";
import { useDispatch } from "react-redux";
import { setFormProduct } from "../../redux/slices/formProduct.slice";

const TableProducts = () => {
  const { data: products, error, isLoading } = useGetProductsQuery();
  const dispatch = useDispatch();

  if (isLoading) {
    return (
      <TableContainer component={Paper} sx={{ p: 3, textAlign: "center" }}>
        <CircularProgress />
      </TableContainer>
    );
  }

  if (error) {
    return (
      <TableContainer component={Paper} sx={{ p: 3, textAlign: "center" }}>
        <Typography color="error">
          Une erreur est survenue. Réessayez plus tard.
        </Typography>
      </TableContainer>
    );
  }

  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: 3,
        borderRadius: 2,
        marginTop: {
          xs: 3,
          sm: 0,
        },
      }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "orange.main" }}>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>#</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Nom
            </TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Prix
            </TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Description
            </TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Catégorie
            </TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Date de création
            </TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products?.map((product, index) => (
            <TableRow
              key={product.id}
              sx={{
                "&:nth-of-type(odd)": {
                  backgroundColor: "#f9f9f9",
                },
                "&:hover": {
                  backgroundColor: "#f1f1f1",
                },
              }}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{`${product.price} €`}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.category.name}</TableCell>
              <TableCell>
                {new Date(product.createdAt).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </TableCell>
              <TableCell
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flexBasis: "100%",
                  gap: 1,
                }}
              >
                <ButtonModify
                  onClick={() => {
                    dispatch(setFormProduct(product));
                  }}
                />
                <ButtonDelete product={product} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableProducts;
