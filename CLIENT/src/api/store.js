import { configureStore } from "@reduxjs/toolkit";
import { api } from "./apiSlice";
import formProductReducer from "../redux/slices/formProduct.slice";
import formCategoryReducer from "../redux/slices/formCategory.slice";
import searchDataReducer from "../redux/slices/searchData.slice";
import scrollInfiniteReducer from "../redux/slices/scrollInifinite.slice";
import authReducer from "../redux/slices/auth.slice";
import formLoginReducer from "../redux/slices/formLogin.slice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    formProduct: formProductReducer,
    formCategory: formCategoryReducer,
    searchData: searchDataReducer,
    scrollInfinite: scrollInfiniteReducer,
    auth: authReducer,
    formLogin: formLoginReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
