import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./playerSlice";
import { apiSlice } from "./apiSlice";

const store = configureStore({
  reducer: {
    player: playerReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
