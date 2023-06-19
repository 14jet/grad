import { configureStore } from "@reduxjs/toolkit";

// reducers
import visaReducer from "./visas.slice";
import toursReducer from "./tours.slice";
import guidesReducer from "./guides.slice";
import companyReducer from "./company.slice";
import visasReducer from "./visas.slice";
import facebookSDKReducer from "./facebookSDK.slice";

const store = configureStore({
  reducer: {
    visa: visaReducer,
    tours: toursReducer,
    guides: guidesReducer,
    company: companyReducer,
    visas: visasReducer,
    facebookSDK: facebookSDKReducer,
  },
});

export default store;
