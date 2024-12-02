import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
  limit: 5,
  search: "",
  category: {
    id: 0,
    name: "",
  },
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
  },
});

export const { setPage, setLimit, setSearch, setCategory } =
  searchDataSlice.actions;

// selectors
export const selectPage = (state) => state.searchData.page;
export const selectLimit = (state) => state.searchData.limit;
export const selectSearch = (state) => state.searchData.search;
export const selectCategory = (state) => state.searchData.category;

export default searchDataSlice.reducer;
