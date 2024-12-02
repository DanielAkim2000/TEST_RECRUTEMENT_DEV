import { api } from "../apiSlice";

const categorySlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "/api/categories",
    }),
    getCategory: builder.query({
      query: (id) => `/api/category/${id}`,
    }),
    createCategory: builder.mutation({
      query: (category) => ({
        url: "categories",
        method: "POST",
        body: category,
      }),
    }),
    updateCategory: builder.mutation({
      query: (category) => ({
        url: `/api/category/${category.id}`,
        method: "PUT",
        body: category,
      }),
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/api/category/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categorySlice;
