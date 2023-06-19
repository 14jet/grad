// main
import { useState, useEffect, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

// components
import TopBar from "../../components/TopBar";
import SpinnerModal from "../../components/SpinnerModal";
import RedAsterisk from "../../components/RedAsterisk";
import NotifyModal from "../../components/NotifyModal";

// other
import usePageTitle from "../../hooks/usePageTitle";
import useAxios from "../../hooks/useAxios";
import { fetchCompanyInfo, updateCompanyInfo } from "../../services/apis";
import validator from "./CompanyInfo.validator";
import styles from "./CompanyInfo.module.css";
import { useSelector } from "react-redux";
import { selectIsAdmin } from "../../store/user.slice";

function CompanyInfo() {
  const [sendRequest, isLoading, data, fetchingError] = useAxios(
    (resData) => resData.data
  );
  const [update, updating, updated, updatingError, resetUpdate] = useAxios(
    (updatedData) => updatedData.data
  );
  const [content, setContent] = useState(null);
  const submitRef = useRef();
  const isAdmin = useSelector(selectIsAdmin);

  const submitTrigger = () => {
    if (submitRef.current) {
      submitRef.current.click();
    }
  };

  const submitHandler = (values) => {
    update(updateCompanyInfo(values));
  };

  useEffect(() => {
    sendRequest(fetchCompanyInfo());
  }, []);

  useEffect(() => {
    if (data) {
      setContent(data);
    }
  }, [data]);

  useEffect(() => {
    if (updated) {
      setContent(updated);
    }
  }, [updated]);

  let notify = {};
  if (updated) {
    notify = {
      type: "success",
      message: "Cập nhật thông tin công ty thành công",
      btn: {
        text: "OK",
        cb: () => {
          resetUpdate();
        },
        component: "button",
      },
      show: updated,
      time: 10000,
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
      show: updatingError,
    };
  }

  usePageTitle("Thông tin công ty");
  return (
    <>
      <NotifyModal {...notify} />
      <SpinnerModal show={isLoading || updating} />
      <TopBar title="Thông tin liên hệ công ty">
        {content && isAdmin && (
          <button onClick={submitTrigger} className="btn btn-primary">
            Lưu
          </button>
        )}
      </TopBar>

      <div className="mb-3">
        {content && (
          <Formik
            initialValues={content}
            onSubmit={submitHandler}
            validationSchema={validator}
            enableReinitialize
          >
            <Form>
              <div className="row m-0">
                <div className="col-6">
                  <div className={styles.formGroup + " shadow"}>
                    <label>
                      <h6>
                        Tên công ty <RedAsterisk />
                      </h6>
                      <Field name="name" />
                      <ErrorMessage
                        component="p"
                        className="text-danger m-0"
                        name="name"
                      />
                    </label>

                    <label>
                      <h6>
                        Địa chỉ <RedAsterisk />
                      </h6>
                      <Field name="address" />
                      <ErrorMessage
                        component="p"
                        className="text-danger m-0"
                        name="address"
                      />
                    </label>

                    <label>
                      <h6>
                        Số điện thoại <RedAsterisk />
                      </h6>
                      <Field name="phone" />
                      <ErrorMessage
                        component="p"
                        className="text-danger m-0"
                        name="phone"
                      />
                    </label>

                    <label>
                      <h6>
                        Hotline <RedAsterisk />
                      </h6>
                      <Field name="hotline" />
                      <ErrorMessage
                        component="p"
                        className="text-danger m-0"
                        name="hotline"
                      />
                    </label>

                    <label>
                      <h6>
                        Email <RedAsterisk />
                      </h6>
                      <Field name="email" />
                      <ErrorMessage
                        component="p"
                        className="text-danger m-0"
                        name="email"
                      />
                    </label>

                    <label>
                      <h6>
                        Website <RedAsterisk />
                      </h6>
                      <Field name="website" />
                      <ErrorMessage
                        component="p"
                        className="text-danger m-0"
                        name="website"
                      />
                    </label>

                    <label>
                      <h6>
                        Tên giấy phép kinh doanh <RedAsterisk />
                      </h6>
                      <Field name="license_name" />
                      <ErrorMessage
                        component="p"
                        className="text-danger m-0"
                        name="license_name"
                      />
                    </label>

                    <label>
                      <h6>
                        Số giấy phép kinh doanh <RedAsterisk />
                      </h6>
                      <Field name="license_number" />
                      <ErrorMessage
                        component="p"
                        className="text-danger m-0"
                        name="license_number"
                      />
                    </label>

                    <label>
                      <h6>
                        Đơn vị cấp <RedAsterisk />
                      </h6>
                      <Field name="license_agency" />
                      <ErrorMessage
                        component="p"
                        className="text-danger m-0"
                        name="license_agency"
                      />
                    </label>

                    <label>
                      <h6>
                        Ngày cấp <RedAsterisk />
                      </h6>
                      <Field name="license_date" />
                      <ErrorMessage
                        component="p"
                        className="text-danger m-0"
                        name="license_date"
                      />
                    </label>

                    <label>
                      <h6>Facebook</h6>
                      <Field name="facebook" />
                      <ErrorMessage
                        component="p"
                        className="text-danger m-0"
                        name="facebook"
                      />
                    </label>

                    <label>
                      <h6>Instagram</h6>
                      <Field name="instagram" />
                      <ErrorMessage
                        component="p"
                        className="text-danger m-0"
                        name="instagram"
                      />
                    </label>

                    <label>
                      <h6>Youtube</h6>
                      <Field name="youtube" />
                      <ErrorMessage
                        component="p"
                        className="text-danger m-0"
                        name="youtube"
                      />
                    </label>
                  </div>
                </div>

                <div className="col-6">
                  <div className={styles.formGroup + " shadow"}>
                    <label>
                      <h6>
                        Tên công ty - tiếng Anh <RedAsterisk />
                      </h6>
                      <Field name="en.name" />
                      <ErrorMessage
                        component="p"
                        className="text-danger m-0"
                        name="en.name"
                      />
                    </label>

                    <label>
                      <h6>
                        Địa chỉ - tiếng Anh <RedAsterisk />
                      </h6>
                      <Field name="en.address" />
                      <ErrorMessage
                        component="p"
                        className="text-danger m-0"
                        name="en.address"
                      />
                    </label>

                    <label>
                      <h6>
                        Tên giấy phép kinh doanh - tiếng Anh <RedAsterisk />
                      </h6>
                      <Field name="en.license_name" />
                      <ErrorMessage
                        component="p"
                        className="text-danger m-0"
                        name="en.license_name"
                      />
                    </label>

                    <label>
                      <h6>
                        Đơn vị cấp giấy phép - tiếng Anh <RedAsterisk />
                      </h6>
                      <Field name="en.license_agency" />
                      <ErrorMessage
                        component="p"
                        className="text-danger m-0"
                        name="en.license_agency"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <button
                hidden
                ref={submitRef}
                className="btn btn-primary"
                type="submit"
              >
                Lưu
              </button>
            </Form>
          </Formik>
        )}

        {fetchingError && (
          <div className="p-2 ">
            <div className="bg-light shadow rounded p-2">
              <p className="text-danger">{fetchingError.message}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CompanyInfo;
