export const fetchVisas = (params) => ({
  method: "GET",
  url: "/admin/visa",
  params,
});

export const fetchSingleVisaProduct = (visaId) => ({
  method: "PUT",
  url: `/admin/visa/${visaId}`,
});

export const addNewVisaProduct = (data) => ({
  method: "POST",
  url: "/admin/visa",
  data,
});

export const updateVisaProduct = (data) => ({
  method: "PUT",
  url: "/admin/visa",
  data,
});

export const deleteVisaProduct = (_id) => ({
  method: "DELETE",
  url: "/admin/visa",
  data: { _id },
});

// visa category
export const fetchVisasCategory = () => ({
  method: "GET",
  url: "/admin/visa/category",
});

export const addVisasCategoryItem = (data) => ({
  method: "POST",
  url: "/admin/visa/category",
  data,
});

export const updateVisasCategoryItem = (data) => ({
  method: "PUT",
  url: "/admin/visa/category",
  data,
});

export const deleteVisasCategoryItem = (_id) => ({
  method: "DELETE",
  url: "/admin/visa/category",
  data: { _id },
});

export const fetchVisaPayments = () => ({
  method: "GET",
  url: `/admin/visa/payments`,
});

export const deleteVisaPayment = (_id) => ({
  method: "DELETE",
  url: "/admin/visa/payments",
  data: { _id },
});
