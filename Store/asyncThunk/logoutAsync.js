import { createAsyncThunk } from "@reduxjs/toolkit";
import { logout } from "../Reducers/authSlice";

const logoutAsync = createAsyncThunk(
  "auth/logoutAsyncThunk",
  async (payload, { dispatch }) => {
    localStorage.setItem("idToken", "");
    dispatch(logout());
  }
);
export default logoutAsync;
