import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";
import { storeInjector } from "./services/axios";

import i18n from "./services/languages/i18n";
import { i18nInjector } from "./hooks/useAxios";

// css bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// css react slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// css vvvv
import "./assets/css/variables.css";
import "./assets/css/normalize.css";

// config quill
import "./services/helpers/quill/configQuill";

import initFacebookSDK from "./services/facebook/init.sdk";
import { changeFacebookSDKStatus } from "./store/facebookSDK.slice";
store.dispatch(changeFacebookSDKStatus(false));
initFacebookSDK(store);

// injecting
storeInjector(store);
i18nInjector(i18n);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
