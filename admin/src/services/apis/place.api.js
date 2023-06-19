export const fetchPlaces = () => ({
  url: "/admin/place",
  method: "GET",
});

export const deletePlaceItem = (_id) => {
  return {
    url: "/admin/place",
    method: "DELETE",
    data: { _id },
  };
};

export const updatePlaceItem = (formData) => ({
  method: "PUT",
  data: formData,
  url: "/admin/place",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const addPlaceItem = (formData) => ({
  method: "POST",
  data: formData,
  url: "/admin/place",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
