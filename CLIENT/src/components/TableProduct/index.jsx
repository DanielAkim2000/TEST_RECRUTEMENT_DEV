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
} from "@mui/material";
import { useGetProductsQuery } from "../../api/slices/product.slice";
import { useDispatch } from "react-redux";
import { setFormProduct } from "../../redux/slices/formProduct.slice";

const TableProducts = () => {
  const { data: products, error, isLoading } = useGetProductsQuery();
  const dispatch = useDispatch();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                fontWeight: "bold",
              }}
            >
              #
            </TableCell>
            <TableCell>Nom</TableCell>
            <TableCell>Prix</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Catégorie</TableCell>
            <TableCell>Date de création</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products?.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.category.name}</TableCell>
              <TableCell>{product.createdAt}</TableCell>
              <TableCell
                sx={{
                  gap: 2,
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
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
