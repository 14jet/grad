export const fetchOrders = (page) => ({
  method: "GET",
  url: `/admin/order?page=${page}`,
});

export const updateOrderStatus = (_id) => ({
  method: "PUT",
  url: "/admin/order",
  data: {_id},
});

export const deleteOrder = (_id) => ({
  method: "DELETE",
  url: "/admin/order",
  data: { _id },
});
