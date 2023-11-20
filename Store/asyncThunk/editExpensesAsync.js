// import { createAsyncThunk } from "@reduxjs/toolkit";
// // import { editExpenses } from "../Reducers/expenseSlice";

// const editExpensesAsync = createAsyncThunk(
//   "expense/editExpensesAsync",
//   async (payload, { dispatch, getState }) => {
//     try {
//       const username = getState().profile.displayName;
//       console.log(username);
//       const shortenedUsername = username.replace(" ", "");
//       console.log(shortenedUsername);
//       console.log(payload);
//       const response = await fetch(
//         `https://spendwise-client-default-rtdb.firebaseio.com/users/${shortenedUsername}/expenses/${payload.id}.json`,
//         {
//           method: "PUT",
//           body: JSON.stringify(payload),
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       if (!response.ok) {
//         const error = await response.json();
//         console.log(error);
//         throw new Error("Something went Wrong");
//       }
//       const data = await response.json();
//       // dispatch(editExpenses(data));
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

// export default editExpensesAsync;
