// tour
export const fetchTours = (params = {}) => ({
  url: `admin/tour`,
  method: "GET",
  params: params,
});

export const fetchSingleTour = (tourCode) => ({
  method: "GET",
  url: `/admin/tour/${tourCode}`,
});

export const addNewTour = (formData) => ({
  method: "POST",
  url: "/admin/tour",
  data: formData,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const updateTour = (formData) => ({
  method: "PUT",
  url: "/admin/tour",
  data: formData,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const deleteTour = (_id) => ({
  method: "DELETE",
  url: "/admin/tour",
  data: { _id },
});

// itinerary
export const updateTourItinerary = (formData) => ({
  method: "PUT",
  url: "/admin/tour/itinerary",
  data: formData,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// rating
export const addRatingItem = (data) => ({
  method: "POST",
  url: "/admin/tour/rating",
  data,
});

export const updateRatingItem = (data) => ({
  method: "PUT",
  url: "/admin/tour/rating",
  data,
});

export const deleteRatingItem = (data) => ({
  method: "DELETE",
  url: "/admin/tour/rating",
  data,
});

export const updateHotTours = (data) => ({
  method: "PUT",
  url: "/admin/tour/hot",
  data: { tourIds: data },
});

// slider
export const updateSliderTours = (sliderTours) => ({
  method: "PUT",
  url: "/admin/tour/slider",
  data: { sliderTours },
});
