// main
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

// components
import SpinnerModal from "../../../components/SpinnerModal";
import GuideForm from "../GuideForm";
import NotifyModal from "../../../components/NotifyModal";
import TopBar from "../../../components/TopBar";

// other
import usePageTitle from "../../../hooks/usePageTitle";
import { addGuide, resetGuidesState } from "../../../store/guides.slice";
import DELTA from "../../../services/helpers/quill/emptyDelta";

function AddGuide() {
  const [formKey, setFormKey] = useState(1);
  const btnRef = useRef();
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.guides);

  const submitHandler = async (values) => {
    const formData = new FormData();
    const { thumb, banner, ...rest } = values;
    formData.append("thumb", values.thumb);
    formData.append("banner", values.banner);
    formData.append("guide", JSON.stringify(rest));

    dispatch(addGuide(formData));
  };

  const initialValues = {
    title: "",
    slug: "",
    author: "",
    origin: "",
    content: DELTA,
    thumb: "",
    banner: "",
    category: "",
    en: {
      title: "",
      content: DELTA,
    },
  };

  usePageTitle("Tạo bài viết mới");

  // notification
  let notify = {};
  if (status.addGuide === "succeeded") {
    notify = {
      show: status.addGuide === "succeeded",
      message: "Thêm guide thành công",
      type: "success",
      btn: {
        component: "button",
        text: "OK",
        cb: () => {
          dispatch(resetGuidesState("addGuide"));
          setFormKey((prev) => prev + 1);
        },
      },
    };
  }

  if (error.addGuide) {
    notify = {
      show: Boolean(error.addGuide),
      message: error.addGuide.message,
      type: "error",
      btn: {
        component: "button",
        text: "OK",
        cb: () => {
          dispatch(resetGuidesState("addGuide"));
        },
      },
    };
  }

  return (
    <>
      <NotifyModal {...notify} />
      <SpinnerModal show={status.addGuide === "pending"} />

      <TopBar title="Tạo bài viết mới">
        {status.fetchGuides === "succeeded" && (
          <button
            className="btn btn-primary"
            type="submit"
            onClick={() => btnRef.current.click()}
          >
            Lưu
          </button>
        )}
      </TopBar>

      <div className="p-2">
        {status.fetchGuides === "succeeded" && (
          <GuideForm
            key={formKey}
            initialValues={initialValues}
            onSubmit={submitHandler}
            ref={btnRef}
          />
        )}

        {error.fetchGuides && (
          <div className="p-2 bg-light shadow rounded">
            <p className="text-danger m-0">
              Có lỗi xảy ra: {error.fetchGuides.message}
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default AddGuide;
