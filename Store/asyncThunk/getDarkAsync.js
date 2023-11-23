import { createAsyncThunk } from "@reduxjs/toolkit";
import { getPremiumState } from "../Reducers/profileSlice";
import { createHash } from "crypto";
import { toggleDark } from "../Reducers/themeSlice";

const getDarkAsync = createAsyncThunk(
  "profile/getDarkAsync",
  async (payload, { dispatch, getState }) => {
    const username = getState().profile.displayName;
    const email = getState().auth.email;
    if (username) {
      try {
        const hashCode = createHash("sha1").update(email).digest("hex");
        const response = await fetch(
          `https://spendwise-client-default-rtdb.firebaseio.com/users/${hashCode}/theme.json`
        );
        if (!response.ok) {
          const error = await response.json();
          console.log(error);
          throw new Error("get Premium Failed");
        }
        const data = await response.json();
        let dark=false;
        for(let element in data){
            dark=data[element].dark;
        }
        dispatch(toggleDark(dark));
        // dispatch(getPremiumState(data));
      } catch (error) {
        console.log(error);
      }
    }
  }
);
export default getDarkAsync;
