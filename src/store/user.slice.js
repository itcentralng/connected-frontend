import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(sessionStorage.getItem("userState")) || {
  isAuth: false,
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuth = true;
      state.user = action.payload;
      console.log(action.payload);
      sessionStorage.setItem("userState", JSON.stringify(state));
    },
    logout: (state) => {
      state.isAuth = false;
      state.user = null;
      sessionStorage.removeItem("userState");
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
