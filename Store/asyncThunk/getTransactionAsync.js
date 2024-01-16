import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTransaction } from "../Reducers/transactionSlice";
import { createHash, getHashes } from "crypto";
const getTransactionAsync = createAsyncThunk(
  "transaction/getTransactionAsync",
  async (payload, { dispatch, getState }) => {
    const username = getState().profile.displayName;
    const email = getState().auth.email;
    const fetchOnly = payload.fetchOnly;
    if (!!username) {
      try {
        const response = await fetch(
          `http://localhost:8080/getTransactions/${payload.type}/${payload.sort}/${payload.duration}/${payload.page}/${payload.pagination}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authentication: getState().auth.token,
            },
          }
        );

        if (!response.ok) {
          console.log("response failed");
          throw new Error("getting failed");
        }

        const data = await response.json();
        if (!fetchOnly) dispatch(getTransaction(data.transactions));
        return {
          transactions: data.transactions,
          max: data.max,
          stats: data.stats,
          count: data.count,
        };
      } catch (error) {
        console.error(error);
      }
    }
  }
);
export default getTransactionAsync;
