import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  nama: "",
  email: "",
  alamat: "",
  noHp: "",
};

// eslint-disable-next-line import/prefer-default-export
const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.id = action.payload.id;
      // eslint-disable-next-line no-param-reassign
      state.name = action.payload.name;
      // eslint-disable-next-line no-param-reassign
      state.email = action.payload.email;
      // eslint-disable-next-line no-param-reassign
      state.alamat = action.payload.alamat;
      // eslint-disable-next-line no-param-reassign
      state.noHp = action.payload.noHp;
    },
    logout: () => {
      return initialState;
    },
  },
});

export const { login, logout } = authReducer.actions;

export default authReducer.reducer;
