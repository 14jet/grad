import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  facebookSDKWasInitialized: false,
};

const facebookSDKSlice = createSlice({
  name: "facebookSDK",
  initialState,
  reducers: {
    changeFacebookSDKStatus(state, action) {
      state.facebookSDKWasInitialized = action.payload;
    },
  },
});

export const { changeFacebookSDKStatus } = facebookSDKSlice.actions;

export default facebookSDKSlice.reducer;
