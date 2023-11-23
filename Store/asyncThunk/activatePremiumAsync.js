import { createAsyncThunk } from "@reduxjs/toolkit";
import { activatePremium } from "../Reducers/profileSlice";
import { createHash } from "crypto";
const activatePremiumAsync = createAsyncThunk(
  "profile/activatePremiumAsync",
  async (payload, { dispatch, getState }) => {
    const username = getState().profile.displayName;
    const email= getState().auth.email;
    try {
      const hashCode = createHash("sha1").update(email).digest("hex");
        console.log(hashCode);
      const response = await fetch(
        `https://spendwise-client-default-rtdb.firebaseio.com/users/${hashCode}/profile.json`,
        {
          method: "PUT",
          body: JSON.stringify({
            email: getState().profile.email,
            displayName: getState().profile.displayName,
            photoUrl: getState().profile.photoUrl,
            emailVerified: getState().profile.photoUrl,
            isPremium: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        const error = await response.json();
        throw new Error("get Premium Failed");
      }
      const data = await response.json();
      console.log(data);
      dispatch(activatePremium());
    } catch (error) {
      console.log(error);
    }
  }
);
export default activatePremiumAsync;
