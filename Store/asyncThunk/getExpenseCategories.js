const { createAsyncThunk } = require("@reduxjs/toolkit");

const getExpenseCategories = createAsyncThunk(
  "transaction/getExpenseCategories",
  async function (payload, {dispatch, getState}) {
    try {
      const response = await fetch(
        `http://35.170.112.218/getExpenseCategories`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authentication: getState().auth.token,
          },
        }
      );
      const data = await response.json();
      // console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export default getExpenseCategories;
