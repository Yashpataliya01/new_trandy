import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/products/" }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ page = 1, limit = 10, category, tags, sort, search, id }) => {
        let query = `getproducts?page=${page}&limit=${limit}`;
        if (category) query += `&category=${encodeURIComponent(category)}`;
        if (id) query += `&id=${encodeURIComponent(id)}`;
        if (tags) query += `&tags=${encodeURIComponent(tags)}`;
        if (sort) query += `&sort=${sort}`;
        if (search) query += `&search=${encodeURIComponent(search)}`;
        return query;
      },
    }),
    getCategories: builder.query({
      query: () => "/categories",
    }),
  }),
});

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/categories/",
  }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "/",
    }),
  }),
});

export const wishlistApi = createApi({
  reducerPath: "wishlistApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/wishlists/",
    prepareHeaders: (headers) => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user?.uid) {
        headers.set("Authorization", `Bearer ${user.uid}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Wishlist"],
  endpoints: (builder) => ({
    getWishlist: builder.query({
      query: (userId) => `${userId}`,
      providesTags: ["Wishlist"],
    }),
    addToWishlist: builder.mutation({
      query: ({ userId, productId }) => ({
        url: "add",
        method: "POST",
        body: { userId, productId },
      }),
      invalidatesTags: ["Wishlist"],
    }),
    removeFromWishlist: builder.mutation({
      query: ({ userId, productId }) => ({
        url: "remove",
        method: "POST",
        body: { userId, productId },
      }),
      invalidatesTags: ["Wishlist"],
    }),
  }),
});

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/carts/",
    prepareHeaders: (headers) => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user?.uid) {
        headers.set("Authorization", `Bearer ${user.uid}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    getCartByUser: builder.query({
      query: (userId) => `getCartByUser/${userId}`,
      providesTags: ["Cart"],
    }),
    addToCart: builder.mutation({
      query: ({ user, productId, quantity }) => ({
        url: "addToCart",
        method: "POST",
        body: { user, productId, quantity },
      }),
      invalidatesTags: ["Cart"],
    }),
    updateQuantity: builder.mutation({
      query: ({ user, productId, quantity }) => ({
        url: "updateQuantity",
        method: "PUT",
        body: { user, productId, quantity },
      }),
      invalidatesTags: ["Cart"],
    }),
    removeFromCart: builder.mutation({
      query: ({ user, productId }) => ({
        url: "removeFromCart",
        method: "DELETE",
        body: { user, productId },
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const brandsApi = createApi({
  reducerPath: "brandsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/mobiles/",
  }),
  endpoints: (builder) => ({
    getBrands: builder.query({
      query: () => "/",
    }),
  }),
});

export const mobilesApi = createApi({
  reducerPath: "mobilesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/mobiles/",
  }),
  endpoints: (builder) => ({
    getMobiles: builder.query({
      query: (brandId) => `getMobiles?brand=${brandId}`,
    }),
  }),
});

export const discountsApi = createApi({
  reducerPath: "discountsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/discounts/",
  }),
  endpoints: (builder) => ({
    getDiscounts: builder.query({
      query: () => "/",
      transformResponse: (response) => response.data || [],
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
export const { useGetCategoriesQuery } = categoriesApi;
export const {
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} = wishlistApi;
export const {
  useGetCartByUserQuery,
  useAddToCartMutation,
  useUpdateQuantityMutation,
  useRemoveFromCartMutation,
} = cartApi;
export const { useGetBrandsQuery } = brandsApi;
export const { useGetMobilesQuery } = mobilesApi;
export const { useGetDiscountsQuery } = discountsApi;
