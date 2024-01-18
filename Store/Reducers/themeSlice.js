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
      state.dark = !state.dark;
    },
    setDark(state, action) {
      state.dark = action.payload;
    },
    toggleOverlay(state, action) {
      state.overlay = action.payload;
    },
  },
});
export const { toggleDark, getDark, toggleOverlay, setDark } =
  themeSlice.actions;
export default themeSlice.reducer;
