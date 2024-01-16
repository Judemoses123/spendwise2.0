import { createAsyncThunk } from "@reduxjs/toolkit";
import { verify } from "../Reducers/profileSlice";
import { useSelector } from "react-redux";

const verifyEmailCode = createAsyncThunk(
  "profile/verifyEmailCode",
  async (payload, { dispatch, getState }) => {
    try {
      const otp = payload.otp;
      const email = getState().auth.email;
      const response = await fetch(`http://localhost:8080/verifyEmailCode`, {
        method: "POST",
        body: JSON.stringify({ otp, email }),
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
      //   return {
      //     status: "success",
      //     message: `OTP Verfied Successfully`,
      //   };
    } catch (error) {
      console.log(error);
      return { status: "failed", message: "Something Went Wrong, Try again" };
    }
  }
);
export default verifyEmailCode;
