import { createAsyncThunk } from "@reduxjs/toolkit";
import { addTransaction } from "../Reducers/transactionSlice";
import { createHash } from "crypto";

const addTransactionAsync = createAsyncThunk(
  "transaction/addTransactionAsync",
  async (payload, { dispatch, getState }) => {
    try {
      const username = getState().profile.displayName;
      console.log(username);
      const shortenedUsername = username.replace(" ", "");
      console.log(payload);
      const email = getState().auth.email;
      const hashCode = createHash("sha1").update(email).digest("hex");
      console.log(hashCode);
      const response = await fetch(
        `https://spendwise-client-default-rtdb.firebaseio.com/users/${hashCode}/transactions.json`,
        {
          method: "POST",
          body: JSON.stringify(payload),
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
      console.log(data);

      dispatch(addTransaction({ ...payload, id: data.name }));
    } catch (error) {
      console.log(error);
    }
  }
);

export default addTransactionAsync;
