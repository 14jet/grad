export const fetchGuides = () => ({
  url: `/admin/guide`,
  method: "GET",
});

export const fetchSingleGuide = (slug) => ({
  method: "GET",
  url: `/admin/guide/${slug}`,
});

export const addGuide = (formData) => ({
  method: "POST",
  url: "/admin/guide",
  data: formData,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const updateGuide = (formData) => ({
  method: "PUT",
  url: "/admin/guide",
  data: formData,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const deleteGuide = (_id) => ({
  method: "DELETE",
  url: "/admin/guide",
  data: { _id },
});

// guides category
export const fetchGuidesCategory = () => ({
  method: "GET",
  url: "/admin/guide/category",
});

export const addGuidesCategoryItem = (data) => ({
  method: "POST",
  url: "/admin/guide/category",
  data,
});

export const updateGuidesCategoryItem = (data) => ({
  method: "PUT",
  url: "/admin/guide/category",
  data,
});

export const deleteGuidesCategoryItem = (_id) => ({
  method: "DELETE",
  url: "/admin/guide/category",
  data: { _id },
});
