import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchVisas as fetchVisasApi } from "../services/apis";
import axios from "../services/axios";

const initialState = {
  visas: [],
  status: "idle",
  error: null,
};

export const fetchVisas = createAsyncThunk(
  "visas/fetchVisas",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios(fetchVisasApi());
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const visasSlice = createSlice({
  name: "visa",
  initialState,
  reducers: {
    //
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVisas.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchVisas.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.visas = action.payload;
      })
      .addCase(fetchVisas.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const selectVisasCountries = (state) => {
  return Array.from(
    new Set(state.visas.visas.map((visa) => JSON.stringify(visa.country)))
  ).map((item) => JSON.parse(item));
};

export default visasSlice.reducer;
