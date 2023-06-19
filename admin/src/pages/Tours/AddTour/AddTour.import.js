// main
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";

// components
import SpinnerModal from "../../../components/SpinnerModal";
import TourForm from "../TourForm";
import NotifyModal from "../../../components/NotifyModal";
import TopBar from "../../../components/TopBar";

// other
import usePageTitle from "../../../hooks/usePageTitle";
import { addTour, resetToursState } from "../../../store/tours.slice";
import DELTA from "../../../services/helpers/quill/emptyDelta";

const initialValues = {
  destinations: [],

  code: "",
  slug: "",
  name: "",
  journey: "",
  description: DELTA,
  startAt: "",

  price: 0,
  days: 1,
  nights: 0,

  departureDates: [],

  priceIncludes: DELTA,
  priceExcludes: DELTA,
  registrationPolicy: DELTA,
  cancellationPolicy: DELTA,

  thumb: "",
  banner: "",

  itinerary: [
    {
      id: uuid(),
      images: [],
      day: "",
      destination: "",
      content: DELTA,
    },
  ],

  en: {
    name: "",
    journey: "",
    description: DELTA,
    startAt: "",

    priceIncludes: DELTA,
    priceExcludes: DELTA,
    registrationPolicy: DELTA,
    cancellationPolicy: DELTA,

    itinerary: [
      {
        id: uuid(),
        images: [],
        day: "",
        destination: "",
        content: DELTA,
      },
    ],
  },
};

export {
  // main
  useRef,
  useDispatch,
  useSelector,

  // components
  SpinnerModal,
  TourForm,
  NotifyModal,
  TopBar,

  // other
  usePageTitle,
  initialValues,
  addTour,
  resetToursState,
};
