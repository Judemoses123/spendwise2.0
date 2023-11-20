import { createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../Reducers/authSlice";

const signupAsync = createAsyncThunk(
  "auth/signupAsync",
  async (payload, { dispatch }) => {
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBwDAFOT_zame9LlDjzKtYXl5OtCBMGBl0`,
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
        throw new Error("Signup Failed");
      }
      const data = await response.json();
      console.log(data);
      if (response.status < 300) {
        dispatch(login(data));
        localStorage.setItem("idToken", data.idToken);
        console.log("User has successfully signed up.");
        return {message:'Signup successful', status:'success'}
      } else {
        return { message: data.error.errors[0].message, status: "failed" };
      }
    } catch (error) {
      return {message:'Something went wrong', status:'failed'}
    }
  }
);

export default signupAsync;