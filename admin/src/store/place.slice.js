import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../services/axios";
import {
  fetchPlaces as fetchPlacesAPI,
  updatePlaceItem,
  deletePlaceItem,
  addPlaceItem,
} from "../services/apis";

const initialState = {
  status: {
    fetchPlaces: "idle",
    updatePlace: "idle",
    deletePlace: "idle",
    addPlace: "idle",
  }, // idle | pending | succeeded | failed,
  error: {
    fetchPlaces: null,
    updatePlace: null,
    deletePlace: null,
    addPlace: null,
  },
  places: [],
};

export const fetchPlaces = createAsyncThunk(
  "places/fetchPlaces",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios(fetchPlacesAPI());
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

export const updatePlace = createAsyncThunk(
  "places/updatePlace",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios(updatePlaceItem(formData));
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

export const deletePlace = createAsyncThunk(
  "places/deletePlace",
  async (id, { rejectWithValue }) => {
    try {
      await axios(deletePlaceItem(id));
      return id;
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

export const addPlace = createAsyncThunk(
  "places/addPlace",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios(addPlaceItem(data));
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

const destinationsSlice = createSlice({
  name: "places",
  initialState,
  reducers: {
    resetPlacesState(state, action) {
      state.status[action.payload] = "idle";
      state.error[action.payload] = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch all
      .addCase(fetchPlaces.pending, (state, action) => {
        state.error = initialState.error;
        state.status = { ...initialState.status, fetchPlaces: "pending" };
      })
      .addCase(fetchPlaces.fulfilled, (state, action) => {
        state.status.fetchPlaces = "succeeded";
        state.places = action.payload;
      })
      .addCase(fetchPlaces.rejected, (state, action) => {
        state.error.fetchPlaces = action.payload;
        state.status.fetchPlaces = "failed";
      })
      // update
      .addCase(updatePlace.pending, (state, action) => {
        state.status.updatePlace = "pending";
        state.error.updatePlace = null;
      })
      .addCase(updatePlace.fulfilled, (state, action) => {
        state.status.updatePlace = "succeeded";
        state.places = state.places.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
      })
      .addCase(updatePlace.rejected, (state, action) => {
        state.error.updatePlace = action.payload;
        state.status.updatePlace = "failed";
      })
      // add
      .addCase(addPlace.pending, (state, action) => {
        state.status.addPlace = "pending";
        state.error.addPlace = null;
      })
      .addCase(addPlace.fulfilled, (state, action) => {
        state.status.addPlace = "succeeded";
        state.places = [...state.places, action.payload];
      })
      .addCase(addPlace.rejected, (state, action) => {
        state.error.addPlace = action.payload;
        state.status.addPlace = "failed";
      })
      // delete
      .addCase(deletePlace.pending, (state, action) => {
        state.status.deletePlace = "pending";
        state.error.deletePlace = null;
      })
      .addCase(deletePlace.fulfilled, (state, action) => {
        state.status.deletePlace = "succeeded";
        state.places = state.places.filter(
          (item) => item._id !== action.payload
        );
      })
      .addCase(deletePlace.rejected, (state, action) => {
        state.error.deletePlace = action.payload;
        state.status.deletePlace = "failed";
      });
  },
});

export const selectCountries = (state) => {
  return state.places.places.filter((item) => item.type === "country");
};

// selectors
export const selectEuCountries = (state) =>
  state.places.places.filter((item) => {
    return item.continent === "chau-au";
  });
export const selectVnProvinces = (state) =>
  state.places.places.filter((item) => {
    return item.region;
  });

export const { resetPlacesState } = destinationsSlice.actions;

export default destinationsSlice.reducer;
