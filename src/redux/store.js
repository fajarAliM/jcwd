import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/auth";
import searchReducer from "./reducer/search";
import cartReducer from "./reducer/cart";

// eslint-disable-next-line import/prefer-default-export
export const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
    cart: cartReducer,
  },
});
