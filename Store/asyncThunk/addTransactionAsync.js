import { createAsyncThunk } from "@reduxjs/toolkit";
import { addTransaction } from "../Reducers/transactionSlice";

const addTransactionAsync = createAsyncThunk(
  "transaction/addTransactionAsync",
  async (payload, { dispatch, getState }) => {
    try {
      const username = getState().profile.displayName;
      console.log(username);
      const shortenedUsername = username.replace(" ", "");
      console.log(shortenedUsername);
      console.log(payload);
      const response = await fetch(
        `https://spendwise-client-default-rtdb.firebaseio.com/users/${shortenedUsername}/transactions.json`,
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
