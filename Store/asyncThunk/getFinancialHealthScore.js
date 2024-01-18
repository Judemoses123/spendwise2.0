const { createAsyncThunk } = require("@reduxjs/toolkit");

const getFinancialHealthScore = createAsyncThunk(
  "transaction/getFinancialHealthScore",
  async function (payload, { dispatch, getState }) {
    try {
      const response = await fetch(
        `http://localhost:8080/getFinancialHealthScore`,
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

export default getFinancialHealthScore;
