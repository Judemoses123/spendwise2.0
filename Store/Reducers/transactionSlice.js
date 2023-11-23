import { createSlice } from "@reduxjs/toolkit";

const inititalTransactionState = {
  transactions: [],
  totalIncome: 0,
  totalExpenses: 0,
};
const transactionSlice = createSlice({
  name: "transaction",
  initialState: inititalTransactionState,
  reducers: {
    addTransaction(state, action) {
      const newTransactions = [action.payload, ...state.transactions];
      console.log(newTransactions);
      state.transactions = newTransactions;
      if (action.payload.type === "income") {
        state.totalIncome =
          Number(state.totalIncome) + Number(action.payload.amount);
      }
      if (action.payload.type === "expense") {
        state.totalExpenses =
          Number(state.totalExpenses) + Number(action.payload.amount);
      }
    },
    removeTransaction(state, action) {
      const newTransactions = state.transactions.filter((item) => {
        return item.id !== action.payload.id;
      });
      state.transactions = newTransactions;
      if (action.payload.type === "income") {
        state.totalIncome =
          Number(state.totalIncome) - Number(action.payload.amount);
      }
      if (action.payload.type === "expense") {
        state.totalExpenses =
          Number(state.totalExpenses) - Number(action.payload.amount);
      }
    },
    getTransaction(state, action) {
      state.transactions = action.payload;
      // console.log("transactions> ", state.transactions);
      state.totalIncome = state.transactions.reduce((prev, curr) => {
        if (curr.type === "income") {
          // console.log(prev);
          return Number(prev) + Number(curr.amount);
        }
        return prev;
      }, 0);
      state.totalExpenses = state.transactions.reduce((prev, curr) => {
        if (curr.type === "expense") {
          // console.log(prev);
          return Number(prev) + Number(curr.amount);
        }
        return prev;
      }, 0);
    },
    editTransaction(state, action) {
      state.transactions = state.transactions.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        } else {
          return item;
        }
      });
    },
  },
});
export const { addTransaction, removeTransaction, getTransaction ,editTransaction} =
  transactionSlice.actions;
export default transactionSlice.reducer;
