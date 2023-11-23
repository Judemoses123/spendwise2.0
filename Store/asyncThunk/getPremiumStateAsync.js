import { createAsyncThunk } from "@reduxjs/toolkit";
import { getPremiumState } from "../Reducers/profileSlice";
import { createHash } from "crypto";

const getPremiumStateAsync = createAsyncThunk(
  "profile/getPremiumStateAsync",
  async (payload, { dispatch, getState }) => {
    const username = getState().profile.displayName;
    const email= getState().auth.email;
    if (username) {
      try {
        const shortenedUsername = username.replace(" ", "");
        const hashCode = createHash("sha1").update(email).digest("hex");
        const response = await fetch(
          `https://spendwise-client-default-rtdb.firebaseio.com/users/${hashCode}/profile.json`
        );
        if (!response.ok) {
          const error = await response.json();
          console.log(error);
          throw new Error("get Premium Failed");
        }
        const data = await response.json();
        // dispatch(getPremiumState(data));
      } catch (error) {
        console.log(error);
      }
    }
  }
);
export default getPremiumStateAsync;
