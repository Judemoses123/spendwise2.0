import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isLoggedIn: false,
  email: "",
  idToken: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.email = action.payload.email;
      state.idToken = action.payload.idToken;
    },
    logout(state, action) {
      state.isLoggedIn = false;
      state.email = "";
      state.idToken = "";
    },
    setIdToken(state, action) {
      state.idToken = action.payload;
      if (!!action.payload) {
        state.isLoggedIn = true;
      }
    },
    signup(state, action) {
      state.isLoggedIn= true;
      state.email= action.payload.email;
      state.idToken=action.payload.idToken;
    },
  },
});
export const { login, logout, setIdToken } = authSlice.actions;
export default authSlice.reducer;
