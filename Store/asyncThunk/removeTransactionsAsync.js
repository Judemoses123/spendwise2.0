import { createAsyncThunk } from "@reduxjs/toolkit";
import { removeTransaction } from "../Reducers/transactionSlice";
import { createHash } from "crypto";
const removeTransactionsAsync = createAsyncThunk(
  "transactions/removeTransactionsAsync",
  async (payload, { dispatch, getState }) => {
    try {
      const username = getState().profile.displayName;
      const email= getState().auth.email;
      console.log(username);
      const shortenedUsername = username.replace(" ", "");
      console.log(shortenedUsername);
      console.log(payload);
      const hashCode = createHash("sha1").update(email).digest("hex");
        console.log(hashCode);
      const response = await fetch(
        `https://spendwise-client-default-rtdb.firebaseio.com/users/${hashCode}/transactions/${payload.id}.json`,
        {
          method: "DELETE",
          // body: JSON.stringify(payload),
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
      dispatch(removeTransaction({ id: payload.id, amount: payload.amount }));
    } catch (error) {
      console.log(error);
    }
  }
);
export default removeTransactionsAsync;
