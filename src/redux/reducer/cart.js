const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  items: [],
};

const cartReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.items = action.payload;
    },
    editQty: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.items[action.payload.idx].quantity = action.payload.quantity;
    },
    deleteCart: (state, action) => {
      state.items.splice(action.payload, 1);
    },
  },
});

export const { addToCart, editQty, deleteCart } = cartReducer.actions;

export default cartReducer.reducer;
