import { createSlice } from "@reduxjs/toolkit";

const initialThemeState = {
  dark: false,
  overlay: false,
};
const themeSlice = createSlice({
  name: "theme",
  initialState: initialThemeState,
  reducers: {
    toggleDark(state, action) {
      state.dark = action.payload;
    },

    getDark(state, action) {},

    toggleOverlay(state, action) {
      state.overlay = action.payload;
    },
  },
});
export const { toggleDark, getDark, toggleOverlay } = themeSlice.actions;
export default themeSlice.reducer;
