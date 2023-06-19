import axios from "axios";
import config from "../configs";
import i18n from "./languages/i18n";

let store;
export const storeInjector = (injectedStore) => {
  store = injectedStore;
};

const axiosInstance = axios.create({
  baseURL: config.baseURL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  function (config) {
    config.params = { ...config.params, lang: i18n.language };
    return config;
  },
  function (error) {
    console.error("From axios request interceptor: ", error);
    if (!window.navigator.onLine)
      return Promise.reject({
        httpCode: null,
        message: i18n.t("messages.error.offline"),
        code: error.code,
      });

    if (error.request) {
      return Promise.reject({
        httpCode: null,
        message: i18n.t("messages.error.networkError"),
        code: error.code,
      });
    }

    return Promise.reject({
      httpCode: null,
      message: error.message,
      code: error.code,
    });
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.error("From axios response interceptor: ", error);
    if (error.response)
      return Promise.reject({
        httpCode: error.response.status,
        message: error.response.data.message,
        code: error.code,
      });

    if (!window.navigator.onLine)
      return Promise.reject({
        httpCode: null,
        message: i18n.t("messages.error.offline"),
        code: error.code,
      });

    if (error.request) {
      return Promise.reject({
        httpCode: null,
        message: i18n.t("messages.error.networkError"),
        code: error.code,
      });
    }

    return Promise.reject({
      httpCode: null,
      message: error.message,
      code: error.code,
    });
  }
);

export default axiosInstance;
