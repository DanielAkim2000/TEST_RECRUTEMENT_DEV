import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
  limit: 5,
  search: "",
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
  },
});

export const { setPage, setLimit, setSearch } = searchDataSlice.actions;

// selectors
export const selectPage = (state) => state.searchData.page;
export const selectLimit = (state) => state.searchData.limit;
export const selectSearch = (state) => state.searchData.search;

export default searchDataSlice.reducer;
