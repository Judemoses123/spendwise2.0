import { createAsyncThunk } from "@reduxjs/toolkit";
import { setEmail, setToken } from "../Reducers/authSlice";
import getProfileDataAsync from "./getProfileDataAsync";

const setIdTokenAsync = createAsyncThunk(
  "auth/setIdTokenAsync",
  async (payload, { dispatch, getState }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return false;
      }
      const response = await fetch(`http://35.170.112.218/checkTokenValidity`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authentication: token,
        },
      });
      if (!response.ok) {
        const error = await response.json();
        console.log(error);
        throw new Error("something went wrong");
      }
      const data = await response.json();
      if (data.valid) {
        dispatch(setToken({ token }));
        const data = await dispatch(getProfileDataAsync());
        dispatch(setEmail(data.payload.email));
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
);
export default setIdTokenAsync;
