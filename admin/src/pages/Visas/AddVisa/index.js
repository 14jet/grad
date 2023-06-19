// main
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// components
import TopBar from "../../../components/TopBar";
import VisaForm from "../VisaForm";
import SpinnerModal from "../../../components/SpinnerModal";
import NotifyModal from "../../../components/NotifyModal";

// hooks
import { resetVisasState, addVisa } from "../../../store/visas.slice";
import DELTA from "../../../services/helpers/quill/emptyDelta";
import usePageTitle from "../../../hooks/usePageTitle";

function AddVisa() {
  const dispatch = useDispatch();
  const [formKey, setFormKey] = useState(1);

  const initialValues = {
    name: "",
    slug: "",
    country: "",
    detail: DELTA,
    price: "",
    price_policies: {
      includes: DELTA,
      excludes: DELTA,
    },
    terms: {
      cancellation: DELTA,
      notes: DELTA,
    },
    en: {
      name: "",
      detail: DELTA,
      price_policies: {
        includes: DELTA,
        excludes: DELTA,
      },
      terms: {
        cancellation: DELTA,
        notes: DELTA,
      },
    },
  };

  const submitHandler = (values) => {
    dispatch(addVisa(values));
  };
  const { status, error } = useSelector((state) => state.visas);

  const submitBtnRef = useRef();

  const triggerSubmit = () => {
    if (submitBtnRef.current) {
      submitBtnRef.current.click();
    }
  };

  // notifications
  let notify = {};
  if (status.addVisa === "succeeded") {
    notify = {
      type: "success",
      show: status.addVisa === "succeeded",
      message: "Thêm visa thành công",
      btn: {
        component: "button",
        cb: () => {
          dispatch(resetVisasState("addVisa"));
          setFormKey((prev) => prev + 1);
        },
      },
    };
  }

  if (error.addVisa) {
    notify = {
      type: "error",
      show: Boolean(error.addVisa),
      message: error.addVisa.message,
      btn: {
        component: "button",
        cb: () => {
          dispatch(resetVisasState("addVisa"));
        },
      },
    };
  }

  usePageTitle("Tạo visa");
  return (
    <>
      <SpinnerModal show={status.addVisa === "pending"} />
      <NotifyModal {...notify} />

      <TopBar title="Tạo visa mới">
        <button
          onClick={triggerSubmit}
          className="btn btn-primary"
          type="submit"
        >
          Lưu
        </button>
      </TopBar>

      <div className="p-2">
        <VisaForm
          key={formKey}
          ref={submitBtnRef}
          onSubmit={submitHandler}
          initialValues={initialValues}
        />
      </div>
    </>
  );
}

export default AddVisa;
