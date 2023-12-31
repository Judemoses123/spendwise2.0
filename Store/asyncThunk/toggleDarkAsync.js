import { createAsyncThunk } from "@reduxjs/toolkit";
import { addTransaction } from "../Reducers/transactionSlice";
import { createHash } from "crypto";
import { toggleDark } from "../Reducers/themeSlice";

const toggleDarkAsync = createAsyncThunk(
  "transaction/toggleDarkAsync",
  async (payload, { dispatch, getState }) => {
    try {
      const username = getState().profile.displayName;
      const shortenedUsername = username.replace(" ", "");
      const email = getState().auth.email;
      const hashCode = createHash("sha1").update(email).digest("hex");
      const response = await fetch(
        `https://spendwise-client-default-rtdb.firebaseio.com/users/${hashCode}/theme/.json`,
        {
          method: "POST",
          body: JSON.stringify({
            dark: payload,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        const error = await response.json();
        console.log(error);
        throw new Error("Something went Wrong");
      }
      const data = await response.json();
      dispatch(toggleDark(payload));
    } catch (error) {
      console.log(error);
    }
  }
);

export default toggleDarkAsync;
