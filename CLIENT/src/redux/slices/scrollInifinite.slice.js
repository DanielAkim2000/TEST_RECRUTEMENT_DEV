import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  offset: 0,
  limit: 20,
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
      // verifier si les donnees sont pas deja dans le state
      const newData = action.payload.filter((item) => {
        return !state.data.some((item2) => item2.id === item.id);
      });
      state.data = [...state.data, ...newData];
    },
  },
});

export const { setOffset, setLimit, setData } = scrollInfiniteSlice.actions;

export const selectOffset = (state) => state.scrollInfinite.offset;
export const selectLimit = (state) => state.scrollInfinite.limit;
export const selectData = (state) => state.scrollInfinite.data;

export default scrollInfiniteSlice.reducer;
