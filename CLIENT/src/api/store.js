import { configureStore } from "@reduxjs/toolkit";
import { api } from "./apiSlice";
import formProductReducer from "../redux/slices/formProduct.slice";
import formCategoryReducer from "../redux/slices/formCategory.slice";
import categoriesReducer from "../redux/slices/categories.slice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    formProduct: formProductReducer,
    formCategory: formCategoryReducer,
    categories: categoriesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
