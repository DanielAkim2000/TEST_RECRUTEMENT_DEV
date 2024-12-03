import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formProduct: {
    name: "",
    price: null,
    description: "",
    category: { id: 0, name: "Choisissez une catégorie" },
  },
};

export const formProductSlice = createSlice({
  name: "formProduct",
  initialState,
  reducers: {
    setFormProduct: (state, action) => {
      state.formProduct = action.payload;
    },
    setName: (state, action) => {
      state.formProduct.name = action.payload;
    },
    setPrice: (state, action) => {
      state.formProduct.price = action.payload;
    },
    setDescription: (state, action) => {
      state.formProduct.description = action.payload;
    },
    setCategory: (state, action) => {
      state.formProduct.category = action.payload;
    },
    resetFormProduct: (state) => {
      state.formProduct = initialState.formProduct;
    },
  },
});

export const {
  setFormProduct,
  setName,
  setPrice,
  setDescription,
  setCategory,
  resetFormProduct,
} = formProductSlice.actions;

export const selectFormProduct = (state) => state.formProduct.formProduct;
export const selectCategory = (state) => state.formProduct.formProduct.category;

export default formProductSlice.reducer;
