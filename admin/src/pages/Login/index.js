// main
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect } from "react";
import { Navigate, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// components
import SpinnerModal from "../../components/SpinnerModal";

// apis
import useAxios from "../../hooks/useAxios";
import { login } from "../../services/apis";

// store
import { setUser } from "../../store/user.slice";

// css
import styles from "./Login.module.css";

const validator = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = "Bắt buộc";
  }

  if (!values.password) {
    errors.password = "Bắt buộc";
  }

  return errors;
};

const initialValues = {
  username: "",
  password: "",
};

function Login() {
  const [sendRequest, isLoading, data, error] = useAxios();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();

  const submitHandler = (values) => {
    sendRequest(login(values.username, values.password));
  };

  useEffect(() => {
    if (data) {
      dispatch(setUser(data.data));
      localStorage.setItem("accessToken", data.metadata.accessToken);
      localStorage.setItem("user", JSON.stringify(data.data));
    }
  }, [data]);

  if (user && !location.state?.isExpired) {
    return <Navigate to="/" />;
  }

  if (user && location.state?.isExpired) {
    return <Navigate to={location.state?.from} />;
  }

  return (
    <>
      {isLoading && <SpinnerModal show={isLoading} />}

      {/* session expired notification  */}
      <div className={styles.login}>
        {location.state?.isExpired && (
          <div className={styles.expiredSession}>
            <p className="m-0 text-white">
              Phiên của bạn đã hết hạn. Vui lòng đăng nhập lại!
            </p>
          </div>
        )}

        {/* login form  */}
        <Formik
          initialValues={initialValues}
          validate={validator}
          onSubmit={submitHandler}
        >
          {() => {
            return (
              <Form>
                <label className="d-block pt-3">
                  <Field
                    type="text"
                    name="username"
                    placeholder="tên đăng nhập"
                  />
                  <ErrorMessage
                    className="text-danger"
                    name="username"
                    component="span"
                  />
                </label>
                <label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="mật khẩu"
                  />
                  <ErrorMessage
                    className="text-danger"
                    name="password"
                    component="span"
                  />
                </label>

                <p className="text-danger mb-1">{error && error.message}</p>
                <Link className="hover-underline" to="/quen-mat-khau">
                  Quên mật khẩu?
                </Link>
                <button className="mt-1" type="submit">
                  Đăng nhập
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
}

export default Login;
