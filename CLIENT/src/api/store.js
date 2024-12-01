import { configureStore } from "@reduxjs/toolkit";
import { api } from "./apiSlice";
import formProductReducer from "../redux/slices/formProduct.slice";
import formCategoryReducer from "../redux/slices/formCategory.slice";
import searchDataReducer from "../redux/slices/searchData.slice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    formProduct: formProductReducer,
    formCategory: formCategoryReducer,
    searchData: searchDataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
