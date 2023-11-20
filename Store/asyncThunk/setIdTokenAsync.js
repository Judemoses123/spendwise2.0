import { createAsyncThunk } from "@reduxjs/toolkit";
import { setIdToken } from "../Reducers/authSlice";

const setIdTokenAsync= createAsyncThunk(
    'auth/setIdTokenAsync',
    async(payload,{dispatch})=>{
        const id= localStorage.getItem('idToken');
        // console.log(id);
        dispatch(setIdToken(id));
    }
)
export default setIdTokenAsync;