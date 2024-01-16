import { createAsyncThunk } from "@reduxjs/toolkit";
import { removeTransaction } from "../Reducers/transactionSlice";
import { createHash } from "crypto";
const removeTransactionsAsync = createAsyncThunk(
  "transactions/removeTransactionsAsync",
  async (payload, { dispatch, getState }) => {
    try {
      const response = await fetch(`http://localhost:8080/deleteTransaction`, {
        method: "DELETE",
        body: JSON.stringify(payload),
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
      dispatch(removeTransaction({ id: payload.id, amount: payload.amount }));
    } catch (error) {
      console.log(error);
    }
  }
);
export default removeTransactionsAsync;
