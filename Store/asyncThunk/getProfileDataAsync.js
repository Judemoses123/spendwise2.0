import { createAsyncThunk } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getProfileData } from "../Reducers/profileSlice";

const getProfileDataAsync = createAsyncThunk(
  "profile/getProfileDataAsync",
  async (payload, { dispatch, getState }) => {
    try {
      const token = getState().auth.token;
      const response = await fetch(`http://localhost:8080/getUser`, {
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
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
);

export default getProfileDataAsync;
