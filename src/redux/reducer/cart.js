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
  },
});

export const { addToCart } = cartReducer.actions;

export default cartReducer.reducer;
