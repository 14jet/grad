export const fetchSettings = () => ({
  url: "/admin/setting",
  method: "GET",
});

export const updateSettings = (data) => ({
  url: "/admin/setting",
  method: "PUT",
  data,
});
