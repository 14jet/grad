// main
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Navigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

// components
import SpinnerModal from "../../components/SpinnerModal";

// apis
import useAxios from "../../hooks/useAxios";
import { resetPassword } from "../../services/apis";

// css
import styles from "./ForgotPassword.module.css";

function ForgotPassword() {
  const [sendRequest, isLoading, data, error] = useAxios();
  const { user } = useSelector((state) => state.user);

  const submitHandler = (values) => {
    sendRequest(resetPassword(values.email));
  };

  const validator = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Bắt buộc";
    }

    return errors;
  };

  const initialValues = {
    email: "",
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {isLoading && <SpinnerModal show={isLoading} />}

      <div className={styles.login}>
        <Formik
          initialValues={initialValues}
          validate={validator}
          onSubmit={submitHandler}
        >
          <Form>
            <h1 className="pb-2 fs-4 fw-bold text-center border-bottom">
              vvvv.space
            </h1>

            {!data && (
              <div>
                <h6>Quên mật khẩu</h6>

                <label>
                  <p className="mb-1">Nhập email nhận thông báo của bạn:</p>
                  <Field type="text" name="email" />
                  <ErrorMessage
                    className="text-danger"
                    name="email"
                    component="span"
                  />
                </label>

                <p className="text-danger mb-1">{error && error.message}</p>
                <button className="mt-1" type="submit">
                  Gửi
                </button>
              </div>
            )}

            {data && (
              <div>
                <p>{data.message}</p>
                <Link to="/login">
                  <u>Đăng nhập</u>
                </Link>
              </div>
            )}
          </Form>
        </Formik>
      </div>
    </>
  );
}

export default ForgotPassword;
