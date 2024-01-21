import { createAsyncThunk } from "@reduxjs/toolkit";
import { resetPassword } from "../Reducers/profileSlice";
const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async (payload, { dispatch, getState }) => {
    try {
      const response = await fetch(`http://54.161.122.179:8080/updatePassword`, {
        method: "POST",
        body: JSON.stringify(payload),
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
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export default updatePassword;
