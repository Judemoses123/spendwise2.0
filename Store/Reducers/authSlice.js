import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isLoggedIn: false,
  email: "",
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    logout(state, action) {
      state.isLoggedIn = false;
      state.email = "";
      state.token = "";
    },
    setToken(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.email = action.payload.email;
    },
    signup(state, action) {
      state.isLoggedIn = true;
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
  },
});
export const { login, logout, setToken, setEmail } = authSlice.actions;
export default authSlice.reducer;
