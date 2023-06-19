module.exports = () => {
  const fs = require("fs");
  const logger = require("../helpers/logger");

  const readFileStream = (path) => {
    return new Promise((res, rej) => {
      try {
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

  const writeFileStream = (path, input) => {
    return new Promise((res, rej) => {
      try {
        const writableStream = fs.createWriteStream(path);
        writableStream.write(input);
        writableStream.end();
        writableStream.on("finish", () => {
          return res(true);
        });

        writableStream.on("error", (error) => {
          logger(`From writeFileStream (on error): ${error.message}`);
          return rej(error.message);
        });
      } catch (error) {
        logger(`From writeFileStream (catch block): ${error.message}`);
        return rej(error.message);
      }
    });
  };

  return { readFileStream, writeFileStream };
};
