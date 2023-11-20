import { createAsyncThunk } from "@reduxjs/toolkit";
import { update } from "../Reducers/profileSlice";

const updateAsync = createAsyncThunk(
  "auth/updateAsync",
  async (payload, { dispatch, getState }) => {
    try {
      const updateBody = {
        idToken: payload.idToken,
        displayName: payload.displayName,
        photoUrl: payload.photoUrl,
        returnSecureToken: true,
      };
      console.log(updateBody);
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBwDAFOT_zame9LlDjzKtYXl5OtCBMGBl0`,
        {
          method: "POST",
          body: JSON.stringify(updateBody),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        const error = await response.json();
        console.log("error", error);
        throw new Error("Oops! Something Went Wrong");
      }
      const data = await response.json();
      console.log(data);
      dispatch(update(data));
    } catch (error) {
      console.log(error);
    }
  }
);
export default updateAsync;
