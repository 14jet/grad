export const fetchSingleTerm = (type) => ({
  method: "GET",
  url: `/term/${type}`,
});
