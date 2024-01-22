import { createAsyncThunk } from "@reduxjs/toolkit";
import { addTransaction } from "../Reducers/transactionSlice";
import { createHash } from "crypto";
import { toggleDark } from "../Reducers/themeSlice";

const toggleDarkAsync = createAsyncThunk(
  "transaction/toggleDarkAsync",
  async (payload, { dispatch, getState }) => {
    try {
      const response = await fetch(`http://35.170.112.218/toggleDark`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authentication: getState().auth.token,
        },
      });
      if (!response.ok) {
        const error = await response.json();
        console.log(error);
        throw new Error("Something went Wrong");
      }
      const data = await response.json();
      console.log(data);
      dispatch(toggleDark());
    } catch (error) {
      console.log(error);
    }
  }
);

export default toggleDarkAsync;
