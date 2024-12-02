import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formCategory: {
    name: "",
  },
};

export const formCategorySlice = createSlice({
  name: "formCategory",
  initialState,
  reducers: {
    setFormCategory: (state, action) => {
      state.formCategory = action.payload;
    },
    setName: (state, action) => {
      state.formCategory.name = action.payload;
    },
    resetFormCategory: (state) => {
      state.formCategory = initialState.formCategory;
    },
  },
});

export const { setFormCategory, setName, resetFormCategory } =
  formCategorySlice.actions;

export const selectFormCategory = (state) => state.formCategory.formCategory;

export default formCategorySlice.reducer;
