import {
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
} from "./AddTour.import";
import { useState } from "react";
import tourFormPacker from "../TourForm/tourFormPacker";
import {useNavigate} from 'react-router-dom'
import useAuth from '../../../hooks/useAuth';

function AddTour() {
  const [formKey, setFormKey] = useState(1);
  const submitRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { status, error } = useSelector((state) => state.tours);

  const submitHandler = (values) => {
    const formData = tourFormPacker(values);
    dispatch(addTour(formData));
  };

  const submitTrigger = () => {
    if (submitRef.current) {
      submitRef.current.click();
    }
  };

  let notify = {};
  if (status.addTour === "succeeded") {
    notify = {
      type: "success",
      show: status.addTour === "succeeded",
      message: "Tạo tour mới thành công.",
      leftBtn: {
        component: "button",
        text: "Tạo thêm",
        cb: () => {
          setFormKey((prev) => prev + 1);
          dispatch(resetToursState("addTour"));
        },
      },
      rightBtn: {
        component: 'button',
        text: "Danh sách tour",
        to: "/tours",
        cb: () => {
          navigate('/tours')
          dispatch(resetToursState("addTour"));

        },
      }
    };
  }

  if (error.addTour) {
    notify = {
      type: "error",
      show: Boolean(error.addTour),
      message: error.addTour.message,
      btn: {
        component: "button",
        cb: () => {
          dispatch(resetToursState("addTour"));
        },
      },
    };
  }

  usePageTitle("Tạo tour mới");

  useAuth('moderator');
  return (
    <>
      <SpinnerModal show={status.addTour === "pending"} />
      <NotifyModal {...notify} />

      <TopBar title="Tạo tour mới">
        {status.fetchTours === "succeeded" && (
          <button
            type="button"
            onClick={submitTrigger}
            className="btn btn-primary "
          >
            Lưu
          </button>
        )}
      </TopBar>

      <div className="p-2">
        {status.fetchTours === "succeeded" && (
          <TourForm
            key={formKey}
            ref={submitRef}
            initialValues={initialValues}
            onSubmit={submitHandler}
          />
        )}

        {error.fetchTours && (
          <div className="p-2 rounded bg-light shadow">
            <p className="text-danger m-0">{error.fetchTours.message}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default AddTour;
