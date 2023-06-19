import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebar: {
    isShow: true,
  },
};

const layoutSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleSidebar(state, action) {
      state.sidebar.isShow = !state.sidebar.isShow;
    },
  },
});

export const { toggleSidebar } = layoutSlice.actions;
export default layoutSlice.reducer;
