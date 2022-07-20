/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
};

const totalPriceReducer = createSlice({
  name: "price",
  initialState,
  reducers: {
    price: (state, action) => {
      state.totalPrice = action.payload.totalHarga;
      state.checkedItems = action.payload.checkedItems;
    },
    cumulatedPrice: (state, action) => {
      state.totalPrice = action.payload;
    },
    reset: (state) => {
      state.totalPrice = 0;
    },
  },
});

export const { price, cumulatedPrice, reset } = totalPriceReducer.actions;

export default totalPriceReducer.reducer;
