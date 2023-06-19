// main
import { useState, useEffect, useRef } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";

// components
import SpinnerModal from "../../../components/SpinnerModal";
import ErrorMessage from "../../../components/ErrorMessage";
import TourForm from "../TourForm";
import NotifyModal from "../../../components/NotifyModal";
import TopBar from "../../../components/TopBar";

// apis
import useAxios from "../../../hooks/useAxios";
import { addNewTour } from "../../../services/apis";

// other
import usePageTitle from "../../../hooks/usePageTitle";

// css
import styles from "./UpdateTour.module.css";

export {
  // main
  useState,
  useRef,
  useEffect,
  useParams,
  useNavigate,
  Link,

  // components
  SpinnerModal,
  NotifyModal,
  TourForm,
  ErrorMessage,
  TopBar,

  // other
  useAxios,
  addNewTour,
  usePageTitle,
  styles,
};
