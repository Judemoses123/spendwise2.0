import { createAsyncThunk } from "@reduxjs/toolkit";
import { createHash } from "crypto";
import { editTransaction } from "../Reducers/transactionSlice";
// import { editExpenses } from "../Reducers/expenseSlice";

const editTransactionAsync = createAsyncThunk(
  "expense/editTransactionAsync",
  async (payload, { dispatch, getState }) => {
    try {
      const username = getState().profile.displayName;
      console.log(username);
      const shortenedUsername = username.replace(" ", "");
      console.log(shortenedUsername);
      console.log(payload);
      const email = getState().auth.email;
      const hashCode = createHash("sha1").update(email).digest("hex");
      const response = await fetch(
        `https://spendwise-client-default-rtdb.firebaseio.com/users/${hashCode}/transactions/${payload.id}.json`,
        {
          method: "PUT",
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
      dispatch(editTransaction(data));
    } catch (error) {
      console.log(error);
    }
  }
);

export default editTransactionAsync;
