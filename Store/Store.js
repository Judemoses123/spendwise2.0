import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Reducers/authSlice";
import profileReducer from "./Reducers/profileSlice";
import themeReducer from "./Reducers/themeSlice";
import transactionReducer from "./Reducers/transactionSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    theme: themeReducer,
    transaction: transactionReducer,
  },
});

export default store;
