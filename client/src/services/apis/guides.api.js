export const fetchGuides = (params = {}) => ({
  url: `/guide`,
  method: "GET",
  params,
});

export const fetchSingleGuide = (slug) => ({
  url: `/guide/${slug}`,
  method: "GET",
});
