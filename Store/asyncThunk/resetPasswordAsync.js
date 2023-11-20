import { createAsyncThunk } from "@reduxjs/toolkit";
import { resetPassword } from "../Reducers/profileSlice";
const resetPasswordAsync = createAsyncThunk(
  "auth/resetPasswordAsync",
  async (payload, { dispatch }) => {
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBwDAFOT_zame9LlDjzKtYXl5OtCBMGBl0`,
        {
          method: "POST",
          body: JSON.stringify({
            email: payload,
            requestType: "PASSWORD_RESET",
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        const error = await response.json();
        console.log(error);
        throw new Error("Password Reset Failed");
      }
      const data = await response.json();
      console.log(data);
      dispatch(resetPassword(payload));
    } catch (error) {
      console.log(error);
    }
  }
);
export default resetPasswordAsync;
