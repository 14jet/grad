import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "../../services/axios";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { useEffect } from "react";
import { format } from "date-fns";
import {
  getOrder,
  createPayPalOrder,
  capturePayPalOrder,
} from "../../services/apis";
import Container from "../../components/Container";
import Placeholder from "../../components/placeholders/Placeholder";
import PaymentInfoItem from "./PaymentInfoItem";

function VisaPayment() {
  const [sendRequest, isLoading, data, error, resetStates] = useAxios();
  const [isSuccess, setIsSuccess] = useState(false);
  const [paypalError, setPaypalError] = useState(null);
  const { t } = useTranslation();

  const [orderInfo, setOrderInfo] = useState(null);
  const { orderId } = useParams();

  useEffect(() => {
    sendRequest(getOrder(orderId));
  }, [orderId]);

  let clientId = process.env.REACT_APP_PAYPAL_CLIENT_ID;

  const initialOptions = {
    "client-id": clientId,
    currency: "USD",
    "data-client-token": data?.metadata?.clientToken,
  };

  useEffect(() => {
    if (data) {
      setOrderInfo(data.data);
    }
  }, [data]);

  const createPayPalOrderHandler = () => {
    return axios(createPayPalOrder(orderInfo._id)).then((response) => {
      return response.data.data.paypalOrderId;
    });
  };

  const capturePayPalOrderHandler = () => {
    return axios(capturePayPalOrder(orderId)).then(() => {
      setIsSuccess(true);
    });
  };

  const errorHandler = (err) => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
    setPaypalError(err.message);
  };

  return (
    <Container>
      <div className="header">
        <h1 className="py-5 text-center fs-3 fw-bold border-bottom">
          {t("pages.visaPayment.title")}
        </h1>
      </div>

      {orderInfo?.status === "succeeded" && !isSuccess && (
        <div className="mt-3 alert alert-success">
          <p className="text-center m-0">{t("pages.visaPayment.paid")}</p>
        </div>
      )}

      {isSuccess && (
        <div className="mt-3 alert alert-success">
          <p className="text-center m-0">
            {t("pages.visaPayment.paidSuccessfully")}
          </p>
        </div>
      )}

      {paypalError && (
        <div className="mt-3 alert alert-danger">
          <p className="text-center m-0">{paypalError}</p>
        </div>
      )}

      {!isSuccess && (
        <div className="row mt-5">
          <div className="col-12 col-md-6 mb-3">
            {isLoading && <Placeholder rounded width="100%" height={500} />}
            {orderInfo && orderInfo.status !== "succeeded" && !isLoading && (
              <div className="border rounded bg-light p-3">
                <h5 className="text-success pb-3 pt-2 border-bottom">
                  <strong>{t("pages.visaPayment.orderInfo")}</strong>
                </h5>
                <PaymentInfoItem name="Visa" value={orderInfo.visaName} />
                <PaymentInfoItem
                  name={t("form.fullname")}
                  value={orderInfo.fullname}
                />
                <PaymentInfoItem
                  name={t("form.address")}
                  value={orderInfo.address}
                />
                <PaymentInfoItem
                  name={t("form.phoneNumber")}
                  value={orderInfo.phone}
                />
                <PaymentInfoItem
                  name={t("form.email")}
                  value={orderInfo.email}
                />
                <PaymentInfoItem
                  name={t("form.departureDates")}
                  value={format(new Date(orderInfo.date), "dd/MM/yyyy")}
                />
                <PaymentInfoItem
                  name={t("form.passengers")}
                  value={orderInfo.passengers}
                />
                <PaymentInfoItem
                  name={t("form.price")}
                  value={orderInfo.price.toLocaleString() + " USD"}
                />
                <p className="text-danger fs-5 d-flex justify-content-between border-top pt-2">
                  <strong>{t("form.total")}</strong>{" "}
                  <strong>
                    {orderInfo.price * orderInfo.passengers.toLocaleString()}{" "}
                    USD
                  </strong>
                </p>
              </div>
            )}
          </div>

          <div className="col-12 col-md-6">
            {orderInfo && orderInfo.status !== "succeeded" && !isLoading && (
              <PayPalScriptProvider options={initialOptions}>
                <PayPalButtons
                  createOrder={createPayPalOrderHandler}
                  onApprove={capturePayPalOrderHandler}
                  onError={errorHandler}
                />
              </PayPalScriptProvider>
            )}

            {isLoading && (
              <div className="mb-3">
                <Placeholder rounded width="100%" height={50} />
              </div>
            )}
            {isLoading && (
              <div className="mb-3">
                <Placeholder rounded width="100%" height={50} />
              </div>
            )}
            {isLoading && (
              <div className="d-flex justify-content-center">
                <Placeholder rounded width={140} height={20} />
              </div>
            )}
          </div>
        </div>
      )}
    </Container>
  );
}

export default VisaPayment;
