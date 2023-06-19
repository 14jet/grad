export const fetchDestinations = (params = {}) => ({
  url: `/destinations`,
  method: "GET",
  params,
});
