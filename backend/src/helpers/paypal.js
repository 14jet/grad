const axios = require("axios");
const base = "https://api-m.sandbox.paypal.com";

const CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const APP_SECRET = process.env.PAYPAL_APP_SECRET;

async function createOrder(value) {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders`;
  const response = await axios({
    url,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: value,
          },
        },
      ],
    },
  });
  const data = response.data;
  return data;
}

async function capturePayment(orderId) {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders/${orderId}/capture`;
  const response = await axios({
    url,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = response.data;
  return data;
}

async function generateAccessToken() {
  const auth = Buffer.from(CLIENT_ID + ":" + APP_SECRET).toString("base64");
  const response = await axios({
    url: `${base}/v1/oauth2/token`,
    method: "POST",
    data: "grant_type=client_credentials",
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });
  const data = response.data;
  return data.access_token;
}

async function generateClientToken() {
  const accessToken = await generateAccessToken();
  const response = await axios({
    url: `${base}/v1/identity/generate-token`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Accept-Language": "en_US",
      "Content-Type": "application/json",
    },
  });
  const data = response.data;
  return data.client_token;
}

module.exports = {
  createOrder,
  generateClientToken,
  capturePayment,
};
