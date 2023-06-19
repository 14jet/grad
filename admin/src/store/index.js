import { configureStore } from "@reduxjs/toolkit";

// reducers
import userReducer from "./user.slice";
import layoutReducer from "./layout.slice";
import toursReducer from "./tours.slice";
import guidesReducer from "./guides.slice";
import visasReducer from "./visas.slice";
import placesReducer from "./place.slice";

const store = configureStore({
  reducer: {
    user: userReducer,
    layout: layoutReducer,
    tours: toursReducer,
    guides: guidesReducer,
    visas: visasReducer,
    places: placesReducer,
  },
});

export default store;
