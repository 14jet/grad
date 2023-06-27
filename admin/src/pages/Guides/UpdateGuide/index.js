// main
import { useDispatch, useSelector } from "react-redux";
import { useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// components
import GuideForm from "../GuideForm";
import SpinnerModal from "../../../components/SpinnerModal";
import NotifyModal from "../../../components/NotifyModal";
import TopBar from "../../../components/TopBar";

// other
import usePageTitle from "../../../hooks/usePageTitle";
import useAuth from "../../../hooks/useAuth";
import { updateGuide, resetGuidesState } from "../../../store/guides.slice";
import useAxios from "../../../hooks/useAxios";
import { fetchSingleGuide } from "../../../services/apis";
import { selectIsAdmin } from "../../../store/user.slice";

function UpdateGuide() {
  const [sendRequest, isFetching, data, fetchingError] = useAxios();
  const submitRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAdmin = useSelector(selectIsAdmin);

  const { slug } = useParams();
  const { status, error } = useSelector((state) => state.guides);
  const guide = data?.data;

  const isLoading =
    status.fetchGuides === "pending" ||
    status.updateGuide === "pending" ||
    isFetching;

  const submitHandler = async (values) => {
    const formData = new FormData();
    const { thumb, ...rest } = values;

    if (typeof thumb === "string") {
      rest.thumb = thumb;
    } else {
      formData.append("thumb", thumb);
    }

    formData.append("guide", JSON.stringify(rest));

    dispatch(updateGuide(formData));
  };

  const submitTrigger = () => {
    if (submitRef.current) {
      submitRef.current.click();
    }
  };

  usePageTitle("Cập nhật guide");

  // notification
  let notify = {};
  if (status.updateGuide === "succeeded") {
    notify = {
      show: status.updateGuide === "succeeded",
      message: "Cập nhật guide thành công",
      type: "success",
      btn: {
        component: "button",
        text: "OK",
        cb: () => {
          dispatch(resetGuidesState("updateGuide"));
          navigate(-1);
        },
      },
    };
  }

  if (error.updateGuide) {
    notify = {
      show: error.updateGuide,
      message: error.updateGuide.message,
      type: "error",
      btn: {
        component: "button",
        text: "OK",
        cb: () => {
          dispatch(resetGuidesState("updateGuide"));
        },
      },
    };
  }

  useEffect(() => {
    if (status.fetchGuides === "succeeded") {
      sendRequest(fetchSingleGuide(slug));
    }
  }, [slug, status.fetchGuides]);

  useAuth('moderator');

  return (
    <>
      <SpinnerModal show={isLoading} />
      <NotifyModal {...notify} />

      <TopBar title={`Cập nhật guides ${slug}`}>
        {status.fetchGuides === "succeeded" && guide && isAdmin && (
          <button className="btn btn-primary" onClick={submitTrigger}>
            Lưu
          </button>
        )}
      </TopBar>

      <div className="p-2">
        {error.fetchGuides && (
          <div className="p-2 shadow rounded bg-light">
            <p className="text-danger m-0">{error.fetchGuides.message}</p>
          </div>
        )}

        {fetchingError && (
          <div className="shadow rounded bg-light p-2">
            <p className="text-danger m-0">{fetchingError.message}</p>
          </div>
        )}

        {guide && (
          <div>
            <GuideForm
              ref={submitRef}
              initialValues={guide}
              onSubmit={submitHandler}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default UpdateGuide;
