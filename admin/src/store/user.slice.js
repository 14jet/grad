import { createSlice } from "@reduxjs/toolkit";

// user: { username, role }
const initialState = {
  user: null,
  isExpiredSession: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isExpiredSession = false;
    },
    removeUser(state, action) {
      state.user = null;
      state.isExpiredSession = false;
    },
    setIsExpiredSession(state, action) {
      state.isExpiredSession = true;
      state.user = null;
    },
  },
});

export const { setUser, removeUser, setIsExpiredSession } = userSlice.actions;
export const selectIsAdmin = (state) => state.user.user?.role === "admin";
export default userSlice.reducer;
