export const fetchTerms = () => ({
  method: "GET",
  url: "/admin/term",
});

export const updateTerms = (data) => ({
  method: "PUT",
  url: "/admin/term",
  data,
});
