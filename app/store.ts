import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { yapilyApi } from "./src/services/yapily";

export const store = configureStore({
  reducer: {
    [yapilyApi.reducerPath]: yapilyApi.reducer,
  },
  // Enable caching, invalidation, polling and other rtk-query features
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(yapilyApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
