import { createAsyncThunk } from "@reduxjs/toolkit";

const downloadTransactionsAsync = createAsyncThunk(
  "transaction/downloadTransactionsAsync",
  async (payload, { dispatch, getState }) => {
    try {
      const response = await fetch(
        `http://localhost:8080/downloadTransactions`,
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
            Authentication: getState().auth.token,
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
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export default downloadTransactionsAsync;
