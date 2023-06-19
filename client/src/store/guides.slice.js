import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchGuides as fetchGuidesApi } from "../services/apis";
import axios from "../services/axios";

const initialState = {
  guides: [],
  status: "idle", // idle | pending | succeeded | failed
  error: null,
};

export const fetchGuides = createAsyncThunk(
  "guides/fetchGuides",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios(fetchGuidesApi());
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const guidesSlice = createSlice({
  name: "guides",
  initialState,
  reducers: {
    //
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGuides.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchGuides.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.guides = action.payload;
      })
      .addCase(fetchGuides.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default guidesSlice.reducer;

// category
export const selectGuidesCategory = (state) =>
  Array.from(
    new Set(state.guides.guides.map((item) => JSON.stringify(item.category)))
  ).map((item) => JSON.parse(item));
