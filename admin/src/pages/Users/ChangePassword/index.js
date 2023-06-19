// main
import { Field, ErrorMessage, Formik, Form } from "formik";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import usePageTitle from "../../../hooks/usePageTitle";
import useAxios from "../../../hooks/useAxios";
import SpinnerModal from "../../../components/SpinnerModal";
import TopBar from "../../../components/TopBar";
import NotifyModal from "../../../components/NotifyModal";
import { changePassword } from "../../../services/apis";

import styles from "./ChangePassword.module.css";

const validator = (values) => {
  const errors = {};
  if (!values.password) {
    errors.password = "Bắt buộc";
  }

  if (!values.new_password) {
    errors.new_password = "Bắt buộc";
  }

  if (
    values.new_password &&
    (values.new_password.length < 6 || values.new_password.length > 50)
  ) {
    errors.new_password = "Từ 6 - 50 ký tự";
  }

  if (!values.re_new_password) {
    errors.re_new_password = "Bắt buộc";
  }

  if (
    values.new_password &&
    values.re_new_password &&
    values.new_password !== values.re_new_password
  ) {
    errors.re_new_password = "Mật khẩu nhập lại không chính xác";
  }

  return errors;
};

function ChangePassword() {
  const [sendRequest, isLoading, success, error, resetStates] = useAxios();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const submitHandler = (values) => {
    resetStates();
    sendRequest(
      changePassword({
        username: values.username,
        password: values.password,
        new_password: values.new_password,
        re_new_password: values.re_new_password,
      })
    );
  };

  const initialValues = {
    username: user.username,
    password: "",
    new_password: "",
    re_new_password: "",
  };

  usePageTitle("Đổi mật khẩu");

  let notify = {};
  if (success) {
    notify = {
      type: "success",
      message: "Đổi mật khẩu thành công",
      btn: {
        text: "OK",
        cb: () => {
          navigate("/users");
        },
        component: "button",
      },
      onHide: () => {
        navigate("/users");
      },
      show: Boolean(success),
    };
  }

  return (
    <>
      <SpinnerModal show={isLoading} />
      <NotifyModal {...notify} />
      <TopBar title="Đổi mật khẩu"></TopBar>
      <div className={styles.container + " p-2"}>
        {initialValues && (
          <Formik
            initialValues={initialValues}
            validate={validator}
            onSubmit={submitHandler}
          >
            {() => (
              <Form className="rounded bg-light">
                <label className={styles.username}>
                  <h6>Tên đăng nhập</h6>
                  <Field type="text" name="username" readOnly />
                  <ErrorMessage name="username" component="p" />
                </label>

                <label>
                  <h6>Mật khẩu hiện tại</h6>
                  <Field type="password" name="password" />
                  <ErrorMessage name="password" component="p" />
                </label>

                <label>
                  <h6>Mật khẩu mới</h6>
                  <Field type="password" name="new_password" />
                  <ErrorMessage name="new_password" component="p" />
                </label>

                <label>
                  <h6>Nhập lại mật khẩu mới</h6>
                  <Field type="password" name="re_new_password" />
                  <ErrorMessage name="re_new_password" component="p" />
                </label>

                {error && <p className="text-danger mb-1">{error.message}</p>}

                <button className="btn btn-primary" type="submit">
                  Đổi mật khẩu
                </button>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </>
  );
}

export default ChangePassword;
