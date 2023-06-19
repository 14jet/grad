var jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const createError = require("../helpers/errorCreator");

module.exports = (allowedRole) => async (req, res, next) => {
  try {
    const authHeader =
      req.headers["Authorization"] || req.headers["authorization"];
    if (!authHeader) {
      return next(createError(new Error(""), 401, "Unauthorized"));
    }

    // token: Bearer accessToken
    const token = authHeader.split(" ")[1];

    if (!token) {
      return next(createError(new Error(""), 401, "Unauthorized"));
    }

    jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
      if (error) {
        if (error.name === "TokenExpiredError") {
          return next(
            createError(new Error(""), 401, "Your session is expired.")
          );
        }

        return next(createError(new Error(""), 401, "Unauthorized"));
      } else {
        const { username } = decoded;
        const user = await User.findOne({ username });

        if (!user) {
          return next(createError(new Error(""), 401, "Unauthorized"));
        }

        const { CLIENT, rolesMap } = require("../config/auth.config");
        const roleNumber = rolesMap.get(user.role) || -1;
        const allowedRoleNumber =
          rolesMap.get(allowedRole) || rolesMap.get(CLIENT);

        if (roleNumber < allowedRoleNumber) {
          return next(createError(new Error(""), 403, "Forbidden"));
        }

        req.user = user;
        return next();
      }
    });
  } catch (error) {
    return next(createError(error, 500));
  }
};
