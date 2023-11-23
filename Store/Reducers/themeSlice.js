import { createSlice } from "@reduxjs/toolkit";

const initialThemeState = {
  dark: false,
};
const themeSlice = createSlice({
  name: "theme",
  initialState: initialThemeState,
  reducers: {
    toggleDark(state, action) {
      state.dark = action.payload;
    },
    getDark(state, action) {},
  },
});
export const { toggleDark, getDark } = themeSlice.actions;
export default themeSlice.reducer;
