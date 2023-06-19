module.exports = (error, req, res, next) => {
  const logger = require("../helpers/logger");
  console.error(error);

  let logMessage = `${req.method}\t${req.url}\t${error.message}`;
  if (error.httpCode === 500) {
    logMessage += `\t${error.stack}`;
  }

  logger(logMessage);

  const lang = req.query.lang || "vi";
  console.log(error.clientMessage);
  const message =
    typeof error.clientMessage === "string"
      ? error.clientMessage
      : error.clientMessage[lang];

  return res.status(error.httpCode).json({
    message: message,
    code: error.httpCode,
  });
};
