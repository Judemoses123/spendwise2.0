import { createAsyncThunk } from "@reduxjs/toolkit";
import { update } from "../Reducers/profileSlice";

const updateAsync = createAsyncThunk(
  "auth/updateAsync",
  async (payload, { dispatch, getState }) => {
    const token = localStorage.getItem("token");
    console.log(token);
    try {
      const updateBody = {
        displayName: payload.displayName,
        photoUrl: payload.photoUrl,
      };
      console.log(updateBody);
      const response = await fetch(`http://54.161.122.179/updateUser`, {
        method: "POST",
        body: JSON.stringify(updateBody),
        headers: {
          "Content-Type": "application/json",
          Authentication: token,
        },
      });
      if (!response.ok) {
        const error = await response.json();
        console.log("error", error);
        throw new Error("Oops! Something Went Wrong");
      }
      const data = await response.json();
      console.log(data);
      dispatch(
        update({ displayName: data.displayName, photoUrl: data.photoUrl })
      );
    } catch (error) {
      console.log(error);
    }
  }
);
export default updateAsync;
