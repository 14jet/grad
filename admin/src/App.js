// main
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

// components
import RequireAuth from "./components/RequireAuth";
import Alert from "./components/Alert";

// routes
import routes from "./routes";
import { fetchPlaces } from "./store/place.slice";

// actions
import { fetchTours } from "./store/tours.slice";
import { fetchGuides } from "./store/guides.slice";
import {
  fetchPayments as fetchVisaPayments,
  fetchVisas,
  updateVisaPayments,
} from "./store/visas.slice";
import SpinnerModal from "./components/SpinnerModal";

// other
import socket from "./services/socket.io";

const STATUS_SUCCEEDED = "Đã thanh toán";
const STATUS_FAILED_TO_CREATE_ORDER = "Lỗi khi tạo PayPal order";
const STATUS_FAILED_TO_CAPTURE = "Lỗi khi capture PayPal order";
const STATUS_IDLE = "Đã nhập thông tin order";
const STATUS_IS_CREATING_ORDER = "Đang tạo PayPal order";
const STATUS_CREATED_ORDER = "Đã tạo PayPal order";
const STATUS_IS_CAPTURING = "Đang capturing PayPal order";

const statusMap = new Map([
  ["succeeded", STATUS_SUCCEEDED],
  ["failed_to_create_order", STATUS_FAILED_TO_CREATE_ORDER],
  ["failed_to_capture", STATUS_FAILED_TO_CAPTURE],
  ["idle", STATUS_IDLE],
  ["is_creating_order", STATUS_IS_CREATING_ORDER],
  ["created_order", STATUS_CREATED_ORDER],
  ["is_capturing", STATUS_IS_CAPTURING],
]);

function App() {
  const [updateVisaEvent, setUpdateVisaEvent] = useState("");
  const [newOrderEvent, setNewOrderEvent] = useState("");
  const user = useSelector((state) => state.user.user);

  const { status: toursStatus } = useSelector((state) => state.tours);
  const { status: destinationsStatus } = useSelector((state) => state.places);
  const { status: guidesStatus } = useSelector((state) => state.guides);
  const { status: visasStatus } = useSelector((state) => state.visas);

  const isLoading =
    toursStatus.fetchTours === "pending" ||
    destinationsStatus.fetchPlaces === "pending" ||
    guidesStatus.fetchGuides === "pending" ||
    visasStatus.fetchVisas === "pending";

  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      dispatch(fetchTours());
      dispatch(fetchPlaces());
      dispatch(fetchGuides());
      dispatch(fetchVisas());
      dispatch(fetchVisaPayments());
    }
  }, [user]);

  useEffect(() => {
    socket.on("UPDATE_VISA_PAYMENT", (data) => {
      setUpdateVisaEvent(data.status);
      dispatch(updateVisaPayments(data));
    });

    socket.on("NEW_ORDER", (data) => {
      console.log("new order", data, data.message);
      setNewOrderEvent(data.message);
    });
  }, []);

  const onHideAlert = () => {
    setUpdateVisaEvent("");
  };

  const onHideTourOrder = () => {
    setNewOrderEvent("");
  };

  return (
    <>
      {updateVisaEvent && (
        <Alert onHide={onHideAlert} time={10000}>
          {statusMap.get(updateVisaEvent)}
        </Alert>
      )}

      {newOrderEvent && (
        <Alert onHide={onHideTourOrder} time={10000}>
          {newOrderEvent}
        </Alert>
      )}
      <SpinnerModal show={isLoading} />
      <Routes>
        {routes.map((route, index) => {
          const Layout = route.layout;

          let element;
          if (Layout) {
            element = <Layout>{route.element}</Layout>;
          } else {
            element = route.element;
          }

          const children = route.path ? (
            <Route key={route.path} path={route.path} element={element} />
          ) : (
            <>
              {route.paths.map((path) => (
                <Route key={path} path={path} element={element} />
              ))}
            </>
          );

          if (route.role)
            return (
              <Route key={index} element={<RequireAuth role={route.role} />}>
                {children}
              </Route>
            );

          return children;
        })}
      </Routes>
    </>
  );
}

export default App;
