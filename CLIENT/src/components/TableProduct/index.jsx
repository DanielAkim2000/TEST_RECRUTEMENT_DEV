import React, { useEffect, useState } from "react";
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
  Checkbox,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Slide,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { setFormProduct } from "../../redux/slices/formProduct.slice";
import {
  useDeleteProductsMutation,
  useSearchProductsQuery,
} from "../../api/slices/product.slice";
import {
  selectCategory,
  selectLimit,
  selectPage,
  selectPriceMax,
  selectPriceMin,
  selectSearch,
  selectTriPrice,
} from "../../redux/slices/searchData.slice";
import Spinner from "../Spinner";
import useSnackBar from "../../hooks/useSnackBar";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TableProducts = () => {
  const page = useSelector(selectPage) || 1;
  const limit = useSelector(selectLimit) || 5;
  const search = useSelector(selectSearch) || "";
  const priceMax = useSelector(selectPriceMax);
  const priceMin = useSelector(selectPriceMin) || 0;
  const category = useSelector(selectCategory);
  const triPrice = useSelector(selectTriPrice);

  const safeSearch = typeof search === "string" ? search : "";
  const safeLimit = typeof limit === "number" ? limit : 5;
  const safePage = typeof page === "number" ? page : 1;
  const safePrice = {
    min: typeof priceMin === "number" ? priceMin : 0,
    max: typeof priceMax === "number" ? priceMax : null,
  };
  const safeCategory =
    typeof category === "object" ? category : { id: 0, name: "" };
  const safeTriPrice = typeof triPrice === "string" ? triPrice : "asc";
  const {
    data: filteredData,
    error,
    isFetching,
    refetch,
  } = useSearchProductsQuery({
    search: safeSearch,
    page: safePage,
    limit: safeLimit,
    priceMin: safePrice.min,
    priceMax: safePrice.max,
    category: safeCategory,
    triPrice: safeTriPrice,
  });
  const [deleteProducts, { isLoading }] = useDeleteProductsMutation();
  const { openSnackbar } = useSnackBar();
  const dispatch = useDispatch();
  const [productsSelected, setProductsSelected] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const handleChanged = (event) => {
    const { value, checked } = event.target;
    console.log("value", value);
    console.log("checked", checked);
    if (value === "all") {
      if (checked) {
        setProductsSelected(filteredData.products.map((product) => product.id));
      } else {
        setProductsSelected([]);
      }
    } else {
      if (checked) {
        setProductsSelected([...productsSelected, parseInt(value)]);
      } else {
        setProductsSelected(
          productsSelected.filter((id) => id !== parseInt(value))
        );
      }
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleDelete = async () => {
    const res = await deleteProducts(productsSelected);
    setOpenDialog(false);
    openSnackbar(res.data.message, res.data.severity);
    setProductsSelected([]);
  };

  console.log("productsSelected", productsSelected);

  // me permet de recharger les données à chaque fois que je change de page, de limite, de prix ou de catégorie
  useEffect(() => {
    refetch();
    // permet de déselectionner les produits sélectionnés si on change de page
    setProductsSelected([]);
  }, [search, page, limit, refetch, priceMin, priceMax, category, triPrice]);

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
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              {productsSelected.length !== 0 && (
                <>
                  <IconButton onClick={handleOpenDialog}>
                    <DeleteIcon />
                  </IconButton>
                  <Dialog
                    open={openDialog}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                  >
                    <DialogTitle>
                      Voulez vous vraiment supprimer tous les produits
                      sélectionnés ?
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-slide-description">
                        La suppression de ces produits est irréversible.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Annuler</Button>
                      <Button onClick={handleDelete} className="!text-red-500">
                        <Spinner isLoading={isLoading} content={"Supprimer"} />
                      </Button>
                    </DialogActions>
                  </Dialog>
                </>
              )}
              <Checkbox
                value={"all"}
                onChange={handleChanged}
                checked={
                  productsSelected.length === filteredData?.products.length &&
                  filteredData?.products.length !== 0
                }
              />
            </TableCell>
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
                <TableCell>
                  <Checkbox
                    value={product.id}
                    onChange={handleChanged}
                    checked={productsSelected.includes(product.id)}
                  />
                </TableCell>
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
