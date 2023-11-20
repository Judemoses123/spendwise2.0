import { createAsyncThunk } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getProfileData } from "../Reducers/profileSlice";

const getProfileDataAsync = createAsyncThunk(
  "profile/getProfileDataAsync",
  async (payload, { dispatch, getState }) => {
    try {
      const idToken = getState().auth.idToken;
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBwDAFOT_zame9LlDjzKtYXl5OtCBMGBl0`,
        {
          method: "POST",
          body: JSON.stringify({
            idToken: idToken,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        const error = await response.json();
        console.log(error);
        throw new Error("something went wrong");
      }

      const data = await response.json();
      dispatch(getProfileData(data));
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export default getProfileDataAsync;
