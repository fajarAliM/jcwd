import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 0,
  nama: "",
  username: "",
  email: "",
  photo_profile: "",
  is_verified: 0,
  gender: "",
  DOB: "",
  isAdmin: 0,
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
      state.nama = action.payload.nama;
      // eslint-disable-next-line no-param-reassign
      state.username = action.payload.username;
      // eslint-disable-next-line no-param-reassign
      state.email = action.payload.email;
      // eslint-disable-next-line no-param-reassign
      state.photo_profile = action.payload.photo_profile;
      // eslint-disable-next-line no-param-reassign
      state.is_verified = action.payload.is_verified;
      // eslint-disable-next-line no-param-reassign
      state.gender = action.payload.gender;
      // eslint-disable-next-line no-param-reassign
      state.DOB = action.payload.DOB;
      // eslint-disable-next-line no-param-reassign
      state.isAdmin = action.payload.isAdmin;
    },
    logout: () => {
      return initialState;
    },
  },
});

export const { login, logout } = authReducer.actions;

export default authReducer.reducer;
