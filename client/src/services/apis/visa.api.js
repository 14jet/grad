export const fetchVisas = () => ({
  method: "GET",
  url: "/visa",
});

export const fetchVisasByCountry = (country) => ({
  method: "GET",
  url: `/visa/country/${country}`,
});

export const bookVisa = (data) => ({
  method: "POST",
  url: `/visa/book`,
  data: data,
});

export const orderVisa = (data) => ({
  method: "POST",
  url: "/visa/payment/order",
  data,
});

export const getOrder = (orderId) => ({
  method: "GET",
  url: `/visa/payment/order/${orderId}`,
});

export const createPayPalOrder = (orderId) => ({
  method: "POST",
  url: "/visa/payment/create-paypal-order",
  headers: {
    "Content-Type": "application/json",
  },
  data: {
    orderId,
  },
});

export const capturePayPalOrder = (orderId) => ({
  method: "POST",
  url: "/visa/payment/capture-paypal-order",
  headers: {
    "Content-Type": "application/json",
  },
  data: {
    orderId,
  },
});
