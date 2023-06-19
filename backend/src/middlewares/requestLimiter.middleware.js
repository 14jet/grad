const cache = require("../helpers/init.cache");

const getUserIp = (req) => {
  return req.header("x-forwarded-for") || req.connection.remoteAddress;
};

module.exports =
  (requestsCount = 60, duration = 20) =>
  (req, res, next) => {
    const userIp = getUserIp(req);
    const userIpKey = `userIp::${userIp}`;

    let requestNumber = +cache.get(userIpKey) || 0;

    if (requestNumber === 0) {
      cache.set(userIpKey, 1, duration);
      return next();
    }

    if (requestNumber >= 1 && requestNumber <= requestsCount) {
      cache.set(userIpKey, ++requestNumber, duration);
      return next();
    }

    return res.status(503).json({
      message: "Server is busy.",
    });
  };
