import { createSlice } from "@reduxjs/toolkit";

const initialThemeState = {
  dark: false,
};
const themeSlice = createSlice({
  name: "theme",
  initialState: initialThemeState,
  reducers: {
    toggleDark(state, action) {
      state.dark = !state.dark;
    },
  },
});
export const { toggleDark } = themeSlice.actions;
export default themeSlice.reducer;
