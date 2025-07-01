import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/products/" }), // replace with your backend
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ page = 1, limit = 10, category, tags, sort }) => {
        let query = `getproducts?page=${page}&limit=${limit}`;
        if (category) query += `&category=${category}`;
        if (tags) query += `&tags=${tags}`;
        if (sort) query += `&sort=${sort}`;
        return query;
      },
    }),
  }),
});

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/categories/",
  }), // replace with your backend
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "/",
    }),
  }),
});

// Auto-generated React hook
export const { useGetProductsQuery } = productsApi;
export const { useGetCategoriesQuery } = categoriesApi;
