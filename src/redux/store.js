import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/auth";

// eslint-disable-next-line import/prefer-default-export
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
