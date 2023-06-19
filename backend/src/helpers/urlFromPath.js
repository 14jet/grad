const host = require("../config").host;
const getUrlFromPath = (path) => {
  return `${host}/images/${path}`;
};

module.exports = getUrlFromPath;
