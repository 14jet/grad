import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../services/axios";
import {
  fetchVisas as fetchVisasAPI,
  updateVisaProduct,
  addNewVisaProduct,
  deleteVisaProduct,
  fetchVisaPayments,
  deleteVisaPayment as deleteVisaPaymentAPI,
} from "../services/apis";

const initialState = {
  status: {
    fetchVisas: "idle",
    updateVisa: "idle",
    addVisa: "idle",
    deleteVisa: "idle",
    fetchPayments: "idle",
  }, // idle | pending | succeeded | failed,
  error: {
    fetchVisas: null,
    updateVisa: null,
    addVisa: null,
    deleteVisa: null,
    fetchPayments: null,
  },
  visas: [],
  payments: [],
};

export const fetchVisas = createAsyncThunk(
  "visas/fetchVisas",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios(fetchVisasAPI());
      return {
        visas: response.data.data,
      };
    } catch (error) {
      console.error(error);
      if (error.response?.data) {
        return rejectWithValue({
          message: error.response.data.message || "",
          httpCode: error.response.status,
        });
      } else {
        return rejectWithValue({
          message: error.message,
          httpCode: null,
        });
      }
    }
  }
);

export const updateVisa = createAsyncThunk(
  "visas/updateVisa",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios(updateVisaProduct(data));
      return response.data.data;
    } catch (error) {
      console.error(error);
      if (error.response?.data) {
        return rejectWithValue({
          message: error.response.data.message || "",
          httpCode: error.response.status,
        });
      } else {
        return rejectWithValue({
          message: error.message,
          httpCode: null,
        });
      }
    }
  }
);

export const addVisa = createAsyncThunk(
  "visas/addVisa",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios(addNewVisaProduct(data));
      return response.data.data;
    } catch (error) {
      console.error(error);
      if (error.response?.data) {
        return rejectWithValue({
          message: error.response.data.message || "",
          httpCode: error.response.status,
        });
      } else {
        return rejectWithValue({
          message: error.message,
          httpCode: null,
        });
      }
    }
  }
);

export const deleteVisa = createAsyncThunk(
  "visas/deleteVisa",
  async (visaId, { rejectWithValue }) => {
    try {
      await axios(deleteVisaProduct(visaId));
      return visaId;
    } catch (error) {
      console.error(error);
      if (error.response?.data) {
        return rejectWithValue({
          message: error.response.data.message || "",
          httpCode: error.response.status,
        });
      } else {
        return rejectWithValue({
          message: error.message,
          httpCode: null,
        });
      }
    }
  }
);

export const deleteVisaPayment = createAsyncThunk(
  "visas/deleteVisaPayment",
  async (paymentId, { rejectWithValue }) => {
    try {
      await axios(deleteVisaPaymentAPI(paymentId));
      return paymentId;
    } catch (error) {
      console.error(error);
      if (error.response?.data) {
        return rejectWithValue({
          message: error.response.data.message || "",
          httpCode: error.response.status,
        });
      } else {
        return rejectWithValue({
          message: error.message,
          httpCode: null,
        });
      }
    }
  }
);

export const fetchPayments = createAsyncThunk(
  "visas/fetchPayments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios(fetchVisaPayments());
      return response.data.data;
    } catch (error) {
      console.error(error);
      if (error.response?.data) {
        return rejectWithValue({
          message: error.response.data.message || "",
          httpCode: error.response.status,
        });
      } else {
        return rejectWithValue({
          message: error.message,
          httpCode: null,
        });
      }
    }
  }
);

const visasSlice = createSlice({
  name: "visas",
  initialState,
  reducers: {
    resetVisasState(state, action) {
      state.status[action.payload] = "idle";
      state.error[action.payload] = null;
    },
    updateVisaPayments(state, action) {
      const order = action.payload;

      const orderIndex = state.payments.findIndex(
        (payment) => payment._id === order._id
      );

      if (orderIndex === -1) {
        state.payments = [order, ...state.payments];
      } else {
        state.payments[orderIndex] = order;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch visas
      .addCase(fetchVisas.pending, (state, action) => {
        state.error = initialState.error;
        state.status = { ...initialState.status, fetchVisas: "pending" };
      })
      .addCase(fetchVisas.fulfilled, (state, action) => {
        state.status.fetchVisas = "succeeded";
        state.visas = action.payload.visas;
      })
      .addCase(fetchVisas.rejected, (state, action) => {
        state.error.fetchVisas = action.payload;
        state.status.fetchVisas = "failed";
      })
      // updateVisa
      .addCase(updateVisa.pending, (state, action) => {
        state.status.updateVisa = "pending";
        state.error.updateVisa = null;
      })
      .addCase(updateVisa.fulfilled, (state, action) => {
        state.status.updateVisa = "succeeded";
        state.visas = state.visas.map((visa) =>
          visa._id === action.payload._id ? action.payload : visa
        );
      })
      .addCase(updateVisa.rejected, (state, action) => {
        state.error.updateVisa = action.payload;
        state.status.updateVisa = "failed";
      })
      // addVisa
      .addCase(addVisa.pending, (state, action) => {
        state.status.addVisa = "pending";
        state.error.addVisa = null;
      })
      .addCase(addVisa.fulfilled, (state, action) => {
        state.status.addVisa = "succeeded";
        state.visas = [...state.visas, action.payload];
      })
      .addCase(addVisa.rejected, (state, action) => {
        state.error.addVisa = action.payload;
        state.status.addVisa = "failed";
      })
      // delete visa
      .addCase(deleteVisa.pending, (state, action) => {
        state.status.deleteVisa = "pending";
        state.error.deleteVisa = null;
      })
      .addCase(deleteVisa.fulfilled, (state, action) => {
        state.status.deleteVisa = "succeeded";
        state.visas = state.visas.filter((visa) => visa._id !== action.payload);
      })
      .addCase(deleteVisa.rejected, (state, action) => {
        state.error.deleteVisa = action.payload;
        state.status.deleteVisa = "failed";
      })
      // fetch visa payments
      .addCase(fetchPayments.pending, (state, action) => {
        state.status.fetchPayments = "pending";
        state.error.fetchPayments = null;
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.status.fetchPayments = "succeeded";
        state.payments = action.payload;
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.error.fetchPayments = action.payload;
        state.status.fetchPayments = "failed";
      })
      // delete visa payment
      .addCase(deleteVisaPayment.pending, (state, action) => {
        state.status.deleteVisaPayment = "pending";
        state.error.deleteVisaPayment = null;
      })
      .addCase(deleteVisaPayment.fulfilled, (state, action) => {
        state.status.deleteVisaPayment = "succeeded";
        state.payments = state.payments.filter(
          (item) => item._id !== action.payload
        );
      })
      .addCase(deleteVisaPayment.rejected, (state, action) => {
        state.error.deleteVisaPayment = action.payload;
        state.status.deleteVisaPayment = "failed";
      });
  },
});

export const selectVisasWithCountry = (state) => {
  const { visas } = state.visas;
  return visas;
};

export const { resetVisasState, updateVisaPayments } = visasSlice.actions;
export default visasSlice.reducer;
