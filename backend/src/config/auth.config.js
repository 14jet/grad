const ADMIN = "admin";
const MODERATOR = "moderator";
const CLIENT = "client";
const rolesMap = new Map([
  [ADMIN, 10],
  [MODERATOR, 5],
  [CLIENT, 1],
]);

module.exports = {
  ADMIN,
  MODERATOR,
  CLIENT,
  rolesMap,
};
