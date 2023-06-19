import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../services/axios";
import {
  fetchGuides as fetchGuidesAPI,
  updateGuide as updateGuideAPI,
  addGuide as addGuideAPI,
  deleteGuide as deleteGuideAPI,
  deleteGuidesCategoryItem,
  addGuidesCategoryItem,
  updateGuidesCategoryItem,
} from "../services/apis";

const initialState = {
  status: {
    fetchGuides: "idle",
    updateGuide: "idle",
    deleteGuide: "idle",
    addGuide: "idle",
    addCategory: "idle",
    updateCategory: "idle",
    deleteCategory: "idle",
  }, // idle | pending | succeeded | failed,
  error: {
    fetchGuides: null,
    updateGuide: null,
    deleteGuide: null,
    addGuide: null,
    addCategory: null,
    updateCategory: null,
    deleteCategory: null,
  },
  guides: [],
  category: [],
};

export const fetchGuides = createAsyncThunk(
  "guides/fetchGuides",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios(fetchGuidesAPI());
      const guides = response.data.data;
      const category = response.data.metadata.category;
      return {
        guides,
        category,
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

export const updateGuide = createAsyncThunk(
  "guides/updateGuide",
  async (guide, { rejectWithValue }) => {
    try {
      const response = await axios(updateGuideAPI(guide));
      const updatedGuide = response.data.data;
      return updatedGuide;
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

export const addGuide = createAsyncThunk(
  "guides/addGuide",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios(addGuideAPI(data));
      const guide = response.data.data;
      return guide;
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

export const deleteGuide = createAsyncThunk(
  "guides/deleteGuide",
  async (guideId, { rejectWithValue }) => {
    try {
      await axios(deleteGuideAPI(guideId));
      return guideId;
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

export const deleteCategory = createAsyncThunk(
  "guides/deleteCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      await axios(deleteGuidesCategoryItem(categoryId));
      return categoryId;
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

export const addCategory = createAsyncThunk(
  "guides/addCategory",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios(addGuidesCategoryItem(data));
      const newCategoryItem = response.data.data;
      return newCategoryItem;
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

export const updateCategory = createAsyncThunk(
  "guides/updateCategory",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios(updateGuidesCategoryItem(data));
      const updatedCategoryItem = response.data.data;
      return updatedCategoryItem;
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

const guidesSlice = createSlice({
  name: "guides",
  initialState,
  reducers: {
    resetGuidesState(state, action) {
      state.status[action.payload] = "idle";
      state.error[action.payload] = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch guides
      .addCase(fetchGuides.pending, (state, action) => {
        // reset all status and error
        // set fetchTours status = 'pending'
        state.error = initialState.error;
        state.status = { ...initialState.status, fetchGuides: "pending" };
      })
      .addCase(fetchGuides.fulfilled, (state, action) => {
        state.status.fetchGuides = "succeeded";
        state.guides = action.payload.guides;
        state.category = action.payload.category;
      })
      .addCase(fetchGuides.rejected, (state, action) => {
        state.error.fetchGuides = action.payload;
        state.status.fetchGuides = "failed";
      })
      // update guide
      .addCase(updateGuide.pending, (state, action) => {
        state.status.updateGuide = "pending";
        state.error.updateGuide = null;
      })
      .addCase(updateGuide.fulfilled, (state, action) => {
        state.status.updateGuide = "succeeded";
        console.log("bbb", action.payload);
        state.guides = state.guides.map((guide) =>
          guide._id === action.payload._id ? action.payload : guide
        );
      })
      .addCase(updateGuide.rejected, (state, action) => {
        state.error.updateGuide = action.payload;
        state.status.updateGuide = "failed";
      })
      // add guide
      .addCase(addGuide.pending, (state, action) => {
        state.status.addGuide = "pending";
        state.error.addGuide = null;
      })
      .addCase(addGuide.fulfilled, (state, action) => {
        state.status.addGuide = "succeeded";
        state.guides = [...state.guides, action.payload];
      })
      .addCase(addGuide.rejected, (state, action) => {
        state.error.addGuide = action.payload;
        state.status.addGuide = "failed";
      })
      // delete guide
      .addCase(deleteGuide.pending, (state, action) => {
        state.status.deleteGuide = "pending";
        state.error.deleteGuide = null;
      })
      .addCase(deleteGuide.fulfilled, (state, action) => {
        state.status.deleteGuide = "succeeded";
        state.guides = state.guides.filter(
          (guide) => guide._id !== action.payload
        );
      })
      .addCase(deleteGuide.rejected, (state, action) => {
        state.error.deleteGuide = action.payload;
        state.status.deleteGuide = "failed";
      }) // delete category
      .addCase(deleteCategory.pending, (state, action) => {
        state.status.deleteCategory = "pending";
        state.error.deleteCategory = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.status.deleteCategory = "succeeded";
        state.category = state.category.filter(
          (item) => item._id !== action.payload
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.error.deleteCategory = action.payload;
        state.status.deleteCategory = "failed";
      }) // add category
      .addCase(addCategory.pending, (state, action) => {
        state.status.addCategory = "pending";
        state.error.addCategory = null;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.status.addCategory = "succeeded";
        state.category = [...state.category, action.payload];
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.error.addCategory = action.payload;
        state.status.addCategory = "failed";
      }) // update guide category
      .addCase(updateCategory.pending, (state, action) => {
        state.status.updateCategory = "pending";
        state.error.updateCategory = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.status.updateCategory = "succeeded";
        state.category = state.category.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.error.updateCategory = action.payload;
        state.status.updateCategory = "failed";
      });
  },
});

export const { resetGuidesState } = guidesSlice.actions;
export default guidesSlice.reducer;
