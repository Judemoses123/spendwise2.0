import { createAsyncThunk } from "@reduxjs/toolkit";
import { verify } from "../Reducers/profileSlice";

const verifyAsync = createAsyncThunk(
  "profile/verifyAsync",
  async (payload, { dispatch, getState }) => {
    try {
      const verifyBody = {
        requestType: "VERIFY_EMAIL",
        idToken: getState().auth.idToken,
      };
      console.log(verifyBody);
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBwDAFOT_zame9LlDjzKtYXl5OtCBMGBl0`,
        {
          method: "POST",
          body: JSON.stringify(verifyBody),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        const error = await response.json();
        console.log(error);
        throw new Error("verification Failed");
      }
      const data = await response.json();
      console.log(data);
      dispatch(verify());
      //   setEmail(data.email);
      return {
        status: "success",
        message: `Verification email sent to ${data.email}, Please verify.`,
      };
    } catch (error) {
      console.log(error);
      return { status: "failed", message: "Something Went Wrong, Try again" };
    }
  }
);
export default verifyAsync;
