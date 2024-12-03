import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import { api } from "./apiSlice";
import formProductReducer from "../redux/slices/formProduct.slice";
import formCategoryReducer from "../redux/slices/formCategory.slice";
import searchDataReducer from "../redux/slices/searchData.slice";
import scrollInfiniteReducer from "../redux/slices/scrollInifinite.slice";
import authReducer from "../redux/slices/auth.slice";
import formLoginReducer from "../redux/slices/formLogin.slice";

const persistConfig = {
  key: "auth",
  storage,
};

// Combine tous les reducers
const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  formProduct: formProductReducer,
  formCategory: formCategoryReducer,
  searchData: searchDataReducer,
  scrollInfinite: scrollInfiniteReducer,
  auth: persistReducer(persistConfig, authReducer),
  formLogin: formLoginReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(api.middleware),
});

export const persistor = persistStore(store);

export default store;
