import { configureStore } from "@reduxjs/toolkit";
import { productsApi, categoriesApi } from "../services/productsApi.js";

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer, // ✅ ADD THIS
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productsApi.middleware)
      .concat(categoriesApi.middleware), // ✅ ADD THIS
});
