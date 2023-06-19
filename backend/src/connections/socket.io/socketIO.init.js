const { Server } = require("socket.io");

let io;

const initSocketIO = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: [
        "http://localhost:3001",
        "http://localhost:3000",
        "http://admin.vvvv.space",
        "https://admin.vvvv.space",
      ],
      credentials: true,
    },
    allowRequest: (req, callback) => {
      const noOriginHeader = req.headers.origin !== undefined;
      callback(null, noOriginHeader); // only allow requests without 'origin' header
    },
  });
};

const getSocketIO = () => {
  if (!io) {
    throw new Error("SocketIO hasn't initialized");
  }

  return io;
};

module.exports = {
  getSocketIO,
  initSocketIO,
};
