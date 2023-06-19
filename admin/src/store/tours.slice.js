import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../services/axios";
import {
  fetchTours as fetchToursAPI,
  updateTour as updateTourAPI,
  addNewTour,
  updateHotTours as updateHotToursAPI,
  deleteTour as deleteTourAPI,
} from "../services/apis";

const initialState = {
  status: {
    fetchTours: "idle",
    updateTour: "idle",
    addTour: "idle",
    deleteTour: "idle",
  }, // idle | pending | succeeded | failed,
  error: {
    fetchTours: null,
    updateTour: null,
    addTour: null,
    deleteTour: null,
  },
  tours: [],
};

export const fetchTours = createAsyncThunk(
  "tours/fetchTours",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios(fetchToursAPI());
      const tours = response.data.data;
      return tours.map((tour) => {
        if (tour.destinations.some((item) => item.type === "country")) {
          return { ...tour, is_eu_tour: true };
        }

        return { ...tour, is_vn_tour: true };
      });
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


export const updateTour = createAsyncThunk(
  "tours/updateTour",
  async (tours, { rejectWithValue }) => {
    try {
      const response = await axios(updateTourAPI(tours));
      const updatedTour = response.data.data;
      return {
        ...updatedTour,
        is_vn_tour: updatedTour.destinations.some((item) => item.region),
        is_eu_tour: updatedTour.destinations.some(
          (item) => item.continent === "chau-au"
        ),
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

export const addTour = createAsyncThunk(
  "tours/addTour",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios(addNewTour(data));
      const tour = response.data.data;
      return {
        ...tour,
        is_vn_tour: tour.destinations.some((item) => item.region),
        is_eu_tour: tour.destinations.some(
          (item) => item.continent === "chau-au"
        ),
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

export const deleteTour = createAsyncThunk(
  "tours/deleteTour",
  async (tourId, { rejectWithValue }) => {
    try {
      await axios(deleteTourAPI(tourId));
      return tourId;
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

const toursSlice = createSlice({
  name: "tours",
  initialState,
  reducers: {
    resetToursState(state, action) {
      state.status[action.payload] = "idle";
      state.error[action.payload] = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch tours
      .addCase(fetchTours.pending, (state, action) => {
        // reset all status and error
        // set fetchTours status = 'pending'
        state.error = initialState.error;
        state.status = { ...initialState.status, fetchTours: "pending" };
      })
      .addCase(fetchTours.fulfilled, (state, action) => {
        state.status.fetchTours = "succeeded";
        state.tours = action.payload;
      })
      .addCase(fetchTours.rejected, (state, action) => {
        state.error.fetchTours = action.payload;
        state.status.fetchTours = "failed";
      })
      // update tour
      .addCase(updateTour.pending, (state, action) => {
        state.status.updateTour = "pending";
        state.error.updateTour = null;
      })
      .addCase(updateTour.fulfilled, (state, action) => {
        state.status.updateTour = "succeeded";
        state.tours = state.tours.map((tour) =>
          tour._id === action.payload._id ? action.payload : tour
        );
      })
      .addCase(updateTour.rejected, (state, action) => {
        state.error.updateTour = action.payload;
        state.status.updateTour = "failed";
      }) 
      // add tour
      .addCase(addTour.pending, (state, action) => {
        state.status.addTour = "pending";
        state.error.addTour = null;
      })
      .addCase(addTour.fulfilled, (state, action) => {
        state.status.addTour = "succeeded";
        console.log(action.payload)
        state.tours = [...state.tours, action.payload];
      })
      .addCase(addTour.rejected, (state, action) => {
        state.error.addTour = action.payload;
        state.status.addTour = "failed";
      })
      // delete tour
      .addCase(deleteTour.pending, (state, action) => {
        state.status.deleteTour = "pending";
        state.error.deleteTour = null;
      })
      .addCase(deleteTour.fulfilled, (state, action) => {
        state.status.deleteTour = "succeeded";
        state.tours = state.tours.filter((tour) => tour._id !== action.payload);
      })
      .addCase(deleteTour.rejected, (state, action) => {
        state.error.deleteTour = action.payload;
        state.status.deleteTour = "failed";
      });
  },
});

export const selectTours = (state) => {
  const { tours, status, error } = state.tours;
  return { tours, status, error };
};

export const { resetToursState } = toursSlice.actions;

export default toursSlice.reducer;
