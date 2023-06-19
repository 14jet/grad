import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCompanyInfo as fetchCompanyInfoAPI } from "../services/apis";
import axios from "../services/axios";

const initialState = {
  company: {
    name: "",
    address: "",
    phone: "",
    hotline: "",
    email: "",
    website: "",
    license_name: "",
    license_agency: "",
    license_number: "",
    license_date: "",
    facebook: "",
    instagram: "",
    youtube: "",
  },
  status: "idle", // idle | pending | succeeded | failed
  error: null,
};

export const fetchCompanyInfo = createAsyncThunk(
  "companyInfo/fetchCompanyInfo",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios(fetchCompanyInfoAPI());
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const companySlice = createSlice({
  name: "companyInfo",
  initialState,
  reducers: {
    //
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyInfo.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchCompanyInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.company = action.payload;
      })
      .addCase(fetchCompanyInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default companySlice.reducer;
