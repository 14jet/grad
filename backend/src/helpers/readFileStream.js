module.exports = (path) => {
  return new Promise((res, rej) => {
    try {
      const fs = require("fs");
      const logger = require("../helpers/logger");
      const readableStream = fs.createReadStream(path);
      readableStream.setEncoding("UTF8");
      let data = "";

      readableStream.on("data", (chunk) => {
        data += chunk;
      });

      readableStream.on("end", () => {
        return res(data);
      });

      readableStream.on("error", (error) => {
        logger(`From readFileStream (on error): ${error.message}`);
        return rej(error.message);
      });
    } catch (error) {
      logger(`From readFileStream (catch block): ${error.message}`);
      return rej(error.message);
    }
  });
};
