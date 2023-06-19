export const fetchTours = (params = {}) => ({
  url: `/tour`,
  method: "GET",
  params: params,
});

export const fetchSingleTour = (slug) => ({
  url: `/tour/${slug}`,
  method: "GET",
});

export const bookTour = (data) => ({
  method: "POST",
  url: "/tour/booking",
  data,
});

export const callMe = (data) => ({
  method: "POST",
  url: "/tour/advisory",
  data,
});
