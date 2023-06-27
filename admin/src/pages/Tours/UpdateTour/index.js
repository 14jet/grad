import {
  // main
  useNavigate,
  useRef,
  useParams,

  // components
  SpinnerModal,
  TourForm,
  NotifyModal,
  TopBar,

  // other
  usePageTitle,
  useAxios,
} from "./UpdateTour.import";
import { updateTour, resetToursState } from "../../../store/tours.slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchSingleTour } from "../../../services/apis";
import { selectIsAdmin } from "../../../store/user.slice";
import tourFormPacker from "../TourForm/tourFormPacker";
import useAuth from '../../../hooks/useAuth';

function UpdateTour() {
  const [sendRequest, isFetching, data, fetchingError] = useAxios();
  const { status, error } = useSelector((state) => state.tours);
  const submitRef = useRef();
  const { tourCode } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAdmin = useSelector(selectIsAdmin);

  const submitHandler = (values) => {
    const formData = tourFormPacker(values);
    dispatch(updateTour(formData));
  };

  const submitTrigger = () => {
    if (submitRef.current) {
      submitRef.current.click();
    }
  };

  let notify = {};
  if (status.updateTour === "succeeded") {
    notify = {
      type: "success",
      show: status.updateTour === "succeeded",
      message: "Cập nhật thành công",
      btn: {
        component: "button",
        cb: () => {
          dispatch(resetToursState("updateTour"));
          navigate(-1);
        },
      },
    };
  }

  if (error.updateTour) {
    notify = {
      type: "error",
      show: Boolean(error.updateTour),
      message: error.updateTour.message,
      btn: {
        component: "button",
        cb: () => {
          dispatch(resetToursState("updateTour"));
        },
      },
    };
  }

  usePageTitle("Cập nhật tour");
  useAuth('moderator');

  let initialValues;
  const tour = data?.data;

  if (tour) {
    initialValues = tour;
  }

  const isLoading = status.updateTour === "pending" || isFetching;

  useEffect(() => {
    if (status.fetchTours === "succeeded") {
      sendRequest(fetchSingleTour(tourCode));
    }
  }, [tourCode, status.fetchTours]);
  return (
    <>
      <SpinnerModal show={isLoading} />
      <NotifyModal {...notify} />

      <TopBar title={`Cập nhật tour [${tourCode}]`}>
        {status.fetchTours === "succeeded" && tour && (
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
        {fetchingError && (
          <div className="p-2 shadow bg-light rounded">
            <p className="text-danger m-0">{fetchingError.message}</p>
          </div>
        )}

        {error.fetchTours && (
          <div className="p-2 shadow bg-light rounded">
            <p className="text-danger m-0">{error.fetchTours.message}</p>
          </div>
        )}

        {tour && (
          <TourForm
            ref={submitRef}
            initialValues={initialValues}
            onSubmit={submitHandler}
          />
        )}
      </div>
    </>
  );
}

export default UpdateTour;
