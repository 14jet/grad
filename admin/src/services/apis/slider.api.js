export const updateSliders = ({ sliderType, products }) => ({
  method: "PUT",
  url: "/admin/slider",
  data: { sliderType, products },
});
