import { createSlice } from "@reduxjs/toolkit";

const initialProfileState = {
  email: "",
  displayName: "",
  photoUrl: "",
  emailVerified: false,
  isPremium: true,
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialProfileState,
  reducers: {
    getProfileData(state, action) {
      state.email = action.payload.email;
      state.displayName = action.payload.displayName;
      state.photoUrl = action.payload.photoUrl;
      state.emailVerified = action.payload.emailVerified;
    },
    update(state, action) {
      state.displayName = action.payload.displayName;
      state.photoUrl = action.payload.photoUrl;
    },
    verify(state, action) {},
    resetPassword(state, action) {},
    activatePremium(state, action) {
      state.isPremium = true;
    },
    getPremiumState(state, action) {
      state.isPremium = !!action.payload
        ? action.payload.isPremium
        : false;
    },
  },
});
export const {
  getProfileData,
  update,
  verify,
  resetPassword,
  activatePremium,
  getPremiumState,
} = profileSlice.actions;
export default profileSlice.reducer;
