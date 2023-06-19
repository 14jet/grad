const rolesMap = new Map([
  ["admin", 10],
  ["moderator", 5],
  ["client", 10],
]);

export const isAuthorized = (userRole, requiredRole) =>
  Array.from(rolesMap.keys()).includes(userRole) &&
  rolesMap.get(userRole) >= rolesMap.get(requiredRole);
