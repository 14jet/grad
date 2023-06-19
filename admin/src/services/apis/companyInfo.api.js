export const fetchCompanyInfo = () => ({
  url: "/admin/company",
  method: "GET",
});

export const updateCompanyInfo = (data) => ({
  url: "/admin/company",
  method: "PUT",
  data: data,
});
