import { api } from "../apiSlice";

const productSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/api/products",
      providesTags: ["Products"],
    }),
    getProduct: builder.query({
      query: (id) => `/api/product/${id}`,
    }),
    searchProducts: builder.query({
      query: (search, page, limit) =>
        `/api/products?search=${search}&page=${page}&limit=${limit}`,
      providesTags: ["Products"],
    }),
    createProduct: builder.mutation({
      query: (product) => ({
        url: "/api/product",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: builder.mutation({
      query: (product) => ({
        url: `/api/product/${product.id}`,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/api/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productSlice;
