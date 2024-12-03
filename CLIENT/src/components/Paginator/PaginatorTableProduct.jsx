import { Pagination, Stack } from "@mui/material";
import React from "react";
import { useSearchProductsQuery } from "../../api/slices/product.slice";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCategory,
  selectLimit,
  selectPage,
  selectPriceMax,
  selectPriceMin,
  selectSearch,
  selectTriPrice,
  setPage,
} from "../../redux/slices/searchData.slice";

const PaginatorTableProduct = () => {
  const page = useSelector(selectPage);
  const limit = useSelector(selectLimit);
  const search = useSelector(selectSearch);
  const category = useSelector(selectCategory);
  const priceMin = useSelector(selectPriceMin);
  const priceMax = useSelector(selectPriceMax);
  const triPrice = useSelector(selectTriPrice);

  const dispatch = useDispatch();

  const { data: filteredProducts } = useSearchProductsQuery({
    search: search,
    page: page,
    limit: limit,
    priceMin: priceMin,
    priceMax: priceMax,
    category: category,
    triPrice: triPrice,
  });

  const handleChange = (event, value) => {
    dispatch(setPage(value));
  };

  return (
    <Stack spacing={2}>
      <Pagination
        count={filteredProducts?.totalPages}
        page={page}
        onChange={handleChange}
      />
    </Stack>
  );
};

export default PaginatorTableProduct;
