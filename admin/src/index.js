import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";
import { setUser } from "./store/user.slice";
import { storeInjector } from "./services/axios";

// config quill
import "./services/helpers/quill/configQuill";

// css bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// // react slick
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// general css
import "./assets/css/variables.css";
import "./assets/css/normalize.css";

import "./App.css";

// injecting
storeInjector(store);

let user = localStorage.getItem("user");
if (user) {
  try {
    user = JSON.parse(user);
  } catch (error) {
    user = null;
  }
}

store.dispatch(setUser(user));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
