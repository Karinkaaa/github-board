import { configureStore } from "@reduxjs/toolkit";
import { repoApi } from "./api";
import { repoReducer } from "./slice";

export const store = configureStore({
  reducer: {
    [repoApi.reducerPath]: repoApi.reducer,
    repo: repoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(repoApi.middleware),
});
