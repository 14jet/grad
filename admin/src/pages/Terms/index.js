// main
import { useEffect, useRef } from "react";
import { Formik, Form } from "formik";

// components
import SpinnerModal from "../../components/SpinnerModal";
import TopBar from "../../components/TopBar";
import TermTab from "./TermTab";
import NotifyModal from "../../components/NotifyModal";

// other
import useAxios from "../../hooks/useAxios";
import { fetchTerms, updateTerms } from "../../services/apis";
import "./Terms.override.css";
import { useSelector } from "react-redux";
import { selectIsAdmin } from "../../store/user.slice";
import usePageTitle from "../../hooks/usePageTitle";

function Terms() {
  const [sendRequest, isLoading, data, fetchingError] = useAxios();
  const [goUpdate, isUpdating, updated, updatingError, resetUpdate] =
    useAxios();
  const submitRef = useRef();
  const isAdmin = useSelector(selectIsAdmin);

  const submitTrigger = () => {
    if (submitRef.current) {
      submitRef.current.click();
    }
  };

  const submitHandler = (values) => {
    resetUpdate();
    goUpdate(updateTerms(values));
  };

  const validator = (values) => {
    const errors = {};
    return errors;
  };

  useEffect(() => {
    sendRequest(fetchTerms());
  }, []);

  let terms;
  if (data) {
    terms = data.data;
  }

  let notify = {};
  if (updated) {
    notify = {
      type: "success",
      message: "Cập nhật thành công",
      btn: {
        text: "OK",
        cb: () => {
          resetUpdate();
        },
        component: "button",
      },
      onHide: () => {
        resetUpdate();
      },
      show: Boolean(updated),
    };
  }

  if (updatingError) {
    notify = {
      type: "error",
      message: updatingError.message,
      btn: {
        text: "OK",
        cb: () => {
          resetUpdate();
        },
        component: "button",
      },
      onHide: () => {
        resetUpdate();
      },
      show: Boolean(updatingError),
    };
  }

  usePageTitle("Điều khoản");

  return (
    <>
      <SpinnerModal show={isLoading || isUpdating} />
      <NotifyModal {...notify} />
      <TopBar title="Điều khoản">
        {terms && isAdmin && (
          <button onClick={submitTrigger} className="btn btn-primary">
            Lưu
          </button>
        )}
      </TopBar>

      <div className="p-2">
        <div className="p-2 shadow rounded bg-light">
          {terms && (
            <Formik
              initialValues={terms}
              validate={validator}
              onSubmit={submitHandler}
            >
              {(formik) => (
                <Form>
                  <h5 className="text-center pb-2 border-bottom">
                    Chính sách bảo mật khách hàng
                  </h5>
                  <div className="row py-3">
                    <div className="col-12 col-lg-6">
                      <TermTab
                        label="Tiếng Việt"
                        formik={formik}
                        name="privacy"
                        initialValue={terms.privacy}
                      />
                    </div>
                    <div className="col-12 col-lg-6">
                      <TermTab
                        label="Tiếng Anh"
                        formik={formik}
                        name="en.privacy"
                        initialValue={terms.en.privacy}
                      />
                    </div>
                  </div>

                  <button ref={submitRef} type="submit" hidden>
                    submit
                  </button>
                </Form>
              )}
            </Formik>
          )}

          {fetchingError && (
            <p className="text-danger m-0">
              Có lỗi xảy ra: {fetchingError.message}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Terms;
