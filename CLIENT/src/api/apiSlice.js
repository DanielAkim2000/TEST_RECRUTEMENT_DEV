import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// si on a une erreur 401 on efface le token
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  tagTypes: [
    "Products",
    "Categories",
    "ProductsFilteredList",
    "PrixMax",
    "Auth",
  ],
  endpoints: (builder) => ({}),
});
