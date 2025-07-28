import { configureStore } from "@reduxjs/toolkit";
import {
  productsApi,
  categoriesApi,
  wishlistApi,
  cartApi,
  brandsApi,
  mobilesApi,
  discountsApi,
  homeApi,
} from "../services/productsApi.js";

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [wishlistApi.reducerPath]: wishlistApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [brandsApi.reducerPath]: brandsApi.reducer,
    [mobilesApi.reducerPath]: mobilesApi.reducer,
    [discountsApi.reducerPath]: discountsApi.reducer,
    [homeApi.reducerPath]: homeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productsApi.middleware)
      .concat(categoriesApi.middleware)
      .concat(wishlistApi.middleware)
      .concat(cartApi.middleware)
      .concat(brandsApi.middleware)
      .concat(mobilesApi.middleware)
      .concat(discountsApi.middleware)
      .concat(homeApi.middleware),
});
