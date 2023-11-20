import { createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../Reducers/authSlice";
const loginAsync = createAsyncThunk(
  "auth/loginAsync",
  async (payload, { dispatch }) => {
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBwDAFOT_zame9LlDjzKtYXl5OtCBMGBl0`,
        {
          method: "POST",
          body: JSON.stringify({
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response) {
        const error = response.json();
        throw new Error("Login Failed");
      }
      const data = await response.json();

      if (response.status < 300) {
        dispatch(login(data));
        localStorage.setItem("idToken", data.idToken);
        return {message:'Login successful', status:'success'}
      } else {
        return { message: data.error.errors[0].message, status: "failed" };
      }
    } catch (error) {
      return {message:'Something went wrong', status:'failed'}
    }
  }
);
export default loginAsync;
