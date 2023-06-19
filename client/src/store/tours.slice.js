import axios from "../services/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTours as fetchToursApi } from "../services/apis";

const initialState = {
  euTours: [],
  vnTours: [],
  catalog: {
    eu: {
      totalCount: 0,
      countByPlace: [],
    },
    vn: {
      totalCount: 0,
      countByPlace: [],
    },
  },
  status: "idle", // idle | pending | succeeded | fail
  error: null,
};

export const fetchTours = createAsyncThunk(
  "tours/fetchTours",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios(fetchToursApi());
      let euTours = [];
      let vnTours = [];
      response.data.data.forEach((tour) => {
        if (tour.destinations.some((item) => item.continent === "chau-au"))
          euTours.push({ ...tour, is_eu_tour: true });
        if (tour.destinations.every((item) => item.region))
          vnTours.push({ ...tour, is_vn_tour: true });
      });

      const catalog = generateCatalog(euTours, vnTours);
      return {
        euTours: [...euTours].sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        ),
        vnTours: [...vnTours].sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        ),
        catalog,
      };
    } catch (error) {
      console.log("TOUR SLICE", error);
      return rejectWithValue(error);
    }
  }
);

const toursSlice = createSlice({
  name: "tours",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTours.pending, (state, action) => {
        state.error = null;
        state.status = "pending";
      })
      .addCase(fetchTours.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.euTours = action.payload.euTours;
        state.vnTours = action.payload.vnTours;
        state.catalog = action.payload.catalog;
      })
      .addCase(fetchTours.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

function generateCatalog(euTours, vnTours) {
  let euCountries = Array.from(
    new Set(
      euTours
        .reduce((prev, cur) => [...prev, ...cur.destinations], [])
        .filter(
          (dest) => dest.type === "country" && dest.continent === "chau-au"
        )
        .map((dest) => ({
          name: dest.name,
          slug: dest.slug,
        }))
    )
  );

  let vnProvinces = vnTours
    .reduce((prev, cur) => [...prev, ...cur.destinations], [])
    .filter(
      (dest) =>
        dest.region &&
        (dest.type === "province" || (dest.type === "city" && !dest.province))
    )
    .map((dest) => ({
      name: dest.name,
      slug: dest.slug,
    }));

  vnProvinces = Array.from(
    new Set(vnProvinces.map((item) => JSON.stringify(item)))
  ).map((item) => JSON.parse(item));

  euCountries = Array.from(
    new Set(euCountries.map((item) => JSON.stringify(item)))
  ).map((item) => JSON.parse(item));

  const euToursCatalogue = euCountries.map((country) => {
    const toursCount = euTours.filter((tour) =>
      tour.destinations.some(
        (dest) => dest.type === "country" && dest.slug === country.slug
      )
    ).length;

    return { place: country, toursCount };
  });

  const vnToursCatalogue = vnProvinces.map((province) => {
    const toursCount = vnTours.filter((tour) =>
      tour.destinations.some((dest) => dest.slug === province.slug)
    ).length;

    return { place: province, toursCount };
  });

  return {
    eu: {
      totalCount: euTours.length,
      countByPlace: euToursCatalogue,
    },
    vn: {
      totalCount: vnTours.length,
      countByPlace: vnToursCatalogue,
    },
  };
}

export const selectTourBySlug = (slug) => (state) => {
  let tour;
  tour = state.tours.euTours.find((item) => item.slug === slug);
  if (tour) return tour;
  return state.tours.vnTours.find((item) => item.slug === slug);
};

export default toursSlice.reducer;
