import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  offset: 0,
  limit: 25,
  data: [],
};

const scrollInfiniteSlice = createSlice({
  name: "scrollInfinite",
  initialState,
  reducers: {
    setOffset: (state, action) => {
      state.offset = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
    setData: (state, action) => {
      state.data = [...state.data, ...action.payload];
    },
  },
});

export const { setOffset, setLimit, setData } = scrollInfiniteSlice.actions;

export const selectOffset = (state) => state.scrollInfinite.offset;
export const selectLimit = (state) => state.scrollInfinite.limit;
export const selectData = (state) => state.scrollInfinite.data;

export default scrollInfiniteSlice.reducer;
