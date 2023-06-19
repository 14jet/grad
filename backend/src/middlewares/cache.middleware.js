const cache = require("../helpers/init.cache");
const CACHE_EXPIRATION = 600;

module.exports =
  (duration = CACHE_EXPIRATION, flushCache) =>
  (req, res, next) => {
    return next()

    if (flushCache && req.method !== "GET") {
      cache.flushAll();
      return next();
    }

    if (req.method !== "GET") {
      return next();
    }

    const key = req.originalUrl;
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
      return res.send(cachedResponse);
    } else {
      res.originalSend = res.send;
      res.send = (body) => {
        res.originalSend(body);
        try {
          cache.set(key, body, duration);
        } catch (error) {
          cache.del(cache.keys().at(-1));
          cache.set(key, body, duration);
        }
      };

      return next();
    }
  };
