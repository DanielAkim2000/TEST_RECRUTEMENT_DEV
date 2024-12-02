import React, { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { setFormProduct } from "../../redux/slices/formProduct.slice";
import { useSearchProductsQuery } from "../../api/slices/product.slice";
import {
  selectLimit,
  selectPage,
  selectSearch,
} from "../../redux/slices/searchData.slice";

const TableProducts = () => {
  const page = useSelector(selectPage) || 1;
  const limit = useSelector(selectLimit) || 5;
  const search = useSelector(selectSearch) || "";

  const safeSearch = typeof search === "string" ? search : "";
  const safeLimit = typeof limit === "number" ? limit : 5;
  const safePage = typeof page === "number" ? page : 1;

  const {
    data: filteredData,
    error,
    isLoading,
    isSuccess,
    isFetching,
    refetch,
  } = useSearchProductsQuery({
    search: safeSearch,
    page: safePage,
    limit: safeLimit,
  });
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (isSuccess) {
  //     dispatch(setProducts(products));
  //   }
  // }, [isSuccess, products, dispatch]);

  useEffect(() => {
    refetch();
  }, [search, page, limit, refetch]);

  console.log("isLoading", isLoading);

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
          {isFetching ? (
            <TableRow sx={{ justifyContent: "center" }}>
              <TableCell colSpan={7} align="center">
                <CircularProgress />
              </TableCell>
            </TableRow>
          ) : filteredData?.products.length > 0 ? (
            filteredData.products.map((product, index) => (
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
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} align="center">
                <Typography>Aucun produit trouvé</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableProducts;
