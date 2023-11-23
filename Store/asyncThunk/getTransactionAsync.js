import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTransaction } from "../Reducers/transactionSlice";
import { createHash, getHashes } from "crypto";
const getTransactionAsync = createAsyncThunk(
  "transaction/getTransactionAsync",
  async (payload, { dispatch, getState }) => {
    const username = getState().profile.displayName;
    const email= getState().auth.email;
    if (!!username) {
      try {
        const shortenedUsername = username.replace(" ", "");
        const hashCode = createHash("sha1").update(email).digest("hex");
        console.log(hashCode);
        const response = await fetch(
          `https://spendwise-client-default-rtdb.firebaseio.com/users/${hashCode}/transactions.json`
        );

        if (!response.ok) {
          const error = await response.json();
          console.log(error);
          console.log("response failed");
          throw new Error("getting failed");
        }

        const data = await response.json();
        const array = [];
        for (let element in data) {
          array.unshift({ ...data[element], id: element });
        }
        // console.log(array);
        dispatch(getTransaction(array));
      } catch (error) {
        console.log(error);
      }
    }
  }
);
export default getTransactionAsync;
