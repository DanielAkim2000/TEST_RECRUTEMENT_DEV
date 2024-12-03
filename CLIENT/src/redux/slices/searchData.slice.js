import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
  limit: 5,
  search: "",
  category: {
    id: 0,
    name: "",
  },
  priceMax: null,
  priceMin: 0,
  triPrice: "asc",
};

const searchDataSlice = createSlice({
  name: "searchData",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setPriceMax: (state, action) => {
      state.priceMax = action.payload;
    },
    setPriceMin: (state, action) => {
      state.priceMin = action.payload;
    },
    setTriPrice: (state, action) => {
      state.triPrice = action.payload;
    },
  },
});

export const {
  setPage,
  setLimit,
  setSearch,
  setCategory,
  setPriceMax,
  setPriceMin,
  setTriPrice,
} = searchDataSlice.actions;

// selectors
export const selectPage = (state) => state.searchData.page;
export const selectLimit = (state) => state.searchData.limit;
export const selectSearch = (state) => state.searchData.search;
export const selectCategory = (state) => state.searchData.category;
export const selectPriceMax = (state) => state.searchData.priceMax;
export const selectPriceMin = (state) => state.searchData.priceMin;
export const selectTriPrice = (state) => state.searchData.triPrice;

export default searchDataSlice.reducer;
