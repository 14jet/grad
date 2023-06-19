// main
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";

// components
import VisaForm from "../VisaForm";
import SpinnerModal from "../../../components/SpinnerModal";
import NotifyModal from "../../../components/NotifyModal";
import ErrorMessage from "../../../components/ErrorMessage";
import TopBar from "../../../components/TopBar";

// other
import { updateVisa, resetVisasState } from "../../../store/visas.slice";
import usePageTitle from "../../../hooks/usePageTitle";
import { selectIsAdmin } from "../../../store/user.slice";

function EditVisa() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitBtnRef = useRef();
  const { status, error, visas } = useSelector((state) => state.visas);
  const isAdmin = useSelector(selectIsAdmin);

  const visa = visas.find((item) => item.slug === slug);

  const submitTrigger = () => {
    if (submitBtnRef.current) {
      submitBtnRef.current.click();
    }
  };

  const submitHandler = (values) => {
    dispatch(updateVisa(values));
  };

  // notification
  let notify = {};
  if (status.updateVisa === "succeeded") {
    notify = {
      type: "success",
      show: status.updateVisa === "succeeded",
      message: "Cập nhật thành công",
      btn: {
        component: "button",
        cb: () => {
          dispatch(resetVisasState("updateVisa"));
          navigate(-1);
        },
      },
    };
  }

  if (error.updateVisa) {
    notify = {
      type: "error",
      show: Boolean(error.updateVisa),
      message: error.updateVisa.message,
      btn: {
        component: "button",
        cb: () => {
          dispatch(resetVisasState("updateVisa"));
        },
      },
    };
  }

  usePageTitle("Cập nhật visa");
  return (
    <>
      <SpinnerModal
        show={
          status.fetchVisas === "pending" || status.updateVisa === "pending"
        }
      />

      <NotifyModal {...notify} />

      {visa && isAdmin && (
        <TopBar title={`Cập nhật visa: ${visa.name}`}>
          <button className="btn btn-primary" onClick={submitTrigger}>
            Lưu
          </button>
        </TopBar>
      )}

      <div className="p-2">
        {visa && (
          <VisaForm
            ref={submitBtnRef}
            onSubmit={submitHandler}
            visaProduct={visa}
            initialValues={{
              ...visa,
              country: visa.country._id,
            }}
          />
        )}

        {error.fetchVisas && <ErrorMessage msg={error.fetchVisas.message} />}

        {status.fetchVisas === "succeeded" &&
          !visa &&
          status.updateVisa === "idle" && (
            <ErrorMessage msg="Không tìm thấy sản phẩm visa" />
          )}
      </div>
    </>
  );
}

export default EditVisa;
