import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, signup } from "../Reducers/authSlice";

const signupAsync = createAsyncThunk(
  "auth/signupAsync",
  async (payload, { dispatch }) => {
    try {
      const response = await fetch(`http://localhost:8080/signupUser`, {
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
        throw new Error("Signup Failed");
      }
      const data = await response.json();
      console.log(data);
      if (data.status == "success") {
        dispatch(login(data));
        localStorage.setItem("token", data.token);
        console.log("User has successfully signed up.");
        return { message: "Signup successful", status: "success" };
        // } else {
        // return { message: data.error.errors[0].message, status: "failed" };
      }
    } catch (error) {
      return { message: "Something went wrong", status: "failed" };
    }
  }
);

export default signupAsync;
