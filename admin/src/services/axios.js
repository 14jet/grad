import axios from "axios";
import config from "../configs";
import { setIsExpiredSession } from "../store/user.slice";

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
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    config.params = { ...config.params };
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      const user = localStorage.getItem("user");
      if (user) {
        store.dispatch(setIsExpiredSession());
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
