import { Pagination, Stack } from "@mui/material";
import React from "react";
import { useSearchProductsQuery } from "../../api/slices/product.slice";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLimit,
  selectPage,
  selectSearch,
  setPage,
} from "../../redux/slices/searchData.slice";

const PaginatorTableProduct = () => {
  const page = useSelector(selectPage);
  const limit = useSelector(selectLimit);
  const search = useSelector(selectSearch);

  const dispatch = useDispatch();

  const { data: filteredProducts } = useSearchProductsQuery({
    search,
    page,
    limit,
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
