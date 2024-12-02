import { configureStore } from "@reduxjs/toolkit";
import { api } from "./apiSlice";
import formProductReducer from "../redux/slices/formProduct.slice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    formProduct: formProductReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
