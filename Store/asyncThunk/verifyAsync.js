import { createAsyncThunk } from "@reduxjs/toolkit";
import { verify } from "../Reducers/profileSlice";
import { useSelector } from "react-redux";

const verifyAsync = createAsyncThunk(
  "profile/verifyAsync",
  async (payload, { dispatch, getState }) => {
    try {
      const email = getState().auth.email;
      console.log(email);
      const verifyBody = {
        email,
      };
      console.log(verifyBody);
      const response = await fetch(`http://localhost:8080/verifyEmail`, {
        method: "POST",
        body: JSON.stringify(verifyBody),
        headers: {
          "Content-Type": "application/json",
          Authentication: localStorage.getItem("token"),
        },
      });
      if (!response.ok) {
        const error = await response.json();
        console.log(error);
        throw new Error("verification Failed");
      }
      const data = await response.json();
      console.log(data);
      // dispatch(verify());
      //   setEmail(data.email);
      return {
        status: "success",
        message: `Please Enter the 4-Digit Verification code sent at ${data.email}`,
      };
    } catch (error) {
      console.log(error);
      return { status: "failed", message: "Something Went Wrong, Try again" };
    }
  }
);
export default verifyAsync;
