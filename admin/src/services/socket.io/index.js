import io from "socket.io-client";
import config from "../../configs";

const socket = io(config.baseURL, {
  withCredentials: true,
});

export default socket;
