import { createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../Reducers/authSlice";
const loginAsync = createAsyncThunk(
  "auth/loginAsync",
  async (payload, { dispatch }) => {
    try {
      const response = await fetch(`http://35.170.112.218/loginUser`, {
        method: "POST",
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response) {
        const error = response.json();
        throw new Error("Login Failed");
      }
      const data = await response.json();
      console.log(data);
      if (data.status == "success") {
        dispatch(login(data));
        localStorage.setItem("token", data.token);
        return { message: "Login successful", status: "success" };
      } else {
        return { message: data.error.errors[0].message, status: "failed" };
      }
    } catch (error) {
      return { message: "Something went wrong", status: "failed" };
    }
  }
);
export default loginAsync;
