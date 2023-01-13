import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

export const ReduxStore = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof ReduxStore.getState>;
export type AppDispatch = typeof ReduxStore.dispatch;
