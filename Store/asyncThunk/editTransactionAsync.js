import { createAsyncThunk } from "@reduxjs/toolkit";
import { createHash } from "crypto";
import { editTransaction } from "../Reducers/transactionSlice";
// import { editExpenses } from "../Reducers/expenseSlice";

const editTransactionAsync = createAsyncThunk(
  "expense/editTransactionAsync",
  async (payload, { dispatch, getState }) => {
    try {
      console.log(payload);
      const response = await fetch(`http://54.161.122.179/updateTransaction`, {
        method: "POST",
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
      return true;
    } catch (error) {
      console.log(error);
    }
  }
);

export default editTransactionAsync;
