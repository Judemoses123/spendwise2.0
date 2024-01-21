import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTransaction } from "../Reducers/transactionSlice";
import { createHash, getHashes } from "crypto";
const getTransactionAsync = createAsyncThunk(
  "transaction/getTransactionAsync",
  async (payload, { dispatch, getState }) => {
    const username = getState().profile.displayName;
    const email = getState().auth.email;
    const fetchOnly = payload.fetchOnly;
    const rpp = payload.rpp ? payload.rpp : 10;
    if (!!username) {
      try {
        const response = await fetch(
          `http://54.161.122.179:8080/getTransactions/${payload.type}/${payload.sort}/${payload.duration}/${payload.page}/${payload.pagination}/${rpp}`,
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
        // console.log(data);
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
