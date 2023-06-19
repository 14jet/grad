// tour
export const updateTourImages = (formData) => ({
  method: "PUT",
  url: "/admin/tour/images",
  data: formData,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
