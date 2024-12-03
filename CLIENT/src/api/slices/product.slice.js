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
    getPrixMax: builder.query({
      query: () => "/api/products/prixMax",
      providesTags: ["PrixMax"],
    }),
    searchProducts: builder.query({
      query: ({
        search,
        page,
        limit,
        priceMin,
        priceMax,
        category,
        triPrice,
      }) =>
        `/api/products/search?search=${search}&page=${page}&limit=${limit}&priceMin=${priceMin}&priceMax=${priceMax}&category=${category.id}&triPrice=${triPrice}`,
      providesTags: ["ProductsFilteredList", "PrixMax"],
    }),
    createProduct: builder.mutation({
      query: (product) => ({
        url: "/api/product",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Products", "ProductsFilteredList", "PrixMax"],
    }),
    updateProduct: builder.mutation({
      query: (product) => ({
        url: `/api/product/${product.id}`,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: ["Products", "ProductsFilteredList", "PrixMax"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/api/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products", "ProductsFilteredList", "PrixMax"],
    }),
    deleteProducts: builder.mutation({
      query: (ids) => ({
        url: `/api/products`,
        method: "DELETE",
        body: ids,
      }),
      invalidatesTags: ["Products", "ProductsFilteredList", "PrixMax"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useSearchProductsQuery,
  useDeleteProductsMutation,
  useGetPrixMaxQuery,
} = productSlice;
