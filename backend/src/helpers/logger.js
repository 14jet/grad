const logger = async (errorMessage) => {
  const path = require("path");
  const fsPromises = require("fs").promises;
  const { v4: uuid } = require("uuid");
  const { format } = require("date-fns");
  const rootDir = require("./rootDir");

  const filePath = path.join(rootDir, "logs", "error.log");
  const time = format(new Date(), "dd-MM-yyyy\thh:mm:ss");
  const log = `${uuid()}\t${time}\t${errorMessage}\n`;

  try {
    await fsPromises.appendFile(filePath, log);
  } catch (error) {
    if (error.code === "ENOENT") {
      fsPromises
        .writeFile(filePath, log)
        .catch((error) => console.error(error));
    } else {
      console.error(error);
    }
  }
};

module.exports = logger;
