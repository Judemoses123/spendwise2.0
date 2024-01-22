import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProfileData } from "../Reducers/profileSlice";
import { setDark } from "../Reducers/themeSlice";

const getProfileDataAsync = createAsyncThunk(
  "profile/getProfileDataAsync",
  async (payload, { dispatch, getState }) => {
    try {
      const token = getState().auth.token;
      const response = await fetch(`http://35.170.112.218/getUser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authentication: token,
        },
      });
      if (!response.ok) {
        const error = await response.json();
        console.log(error);
        throw new Error("something went wrong");
      }
      const data = await response.json();
      dispatch(getProfileData(data));
      dispatch(setDark(Boolean(data.dark)));
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
);

export default getProfileDataAsync;
