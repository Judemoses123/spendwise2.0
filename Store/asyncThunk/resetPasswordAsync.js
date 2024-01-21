import { createAsyncThunk } from "@reduxjs/toolkit";
import { resetPassword } from "../Reducers/profileSlice";
const resetPasswordAsync = createAsyncThunk(
  "auth/resetPasswordAsync",
  async (payload, { dispatch, getState }) => {
    try {
      const response = await fetch(`http://54.161.122.179:8080/forgotPassword`, {
        method: "POST",
        body: JSON.stringify({
          email: payload,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const error = await response.json();
        console.log(error);
        throw new Error("Password Reset Failed");
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
);
export default resetPasswordAsync;
