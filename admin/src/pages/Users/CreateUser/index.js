import { Field, ErrorMessage, Formik, Form } from "formik";
import usePageTitle from "../../../hooks/usePageTitle";
import useAxios from "../../../hooks/useAxios";
import { createUser } from "../../../services/apis";
import styles from "./CreateUser.module.css";
import SpinnerModal from "../../../components/SpinnerModal";
import TopBar from "../../../components/TopBar";

const initialValues = {
  username: "",
  password: "",
  re_password: "",
  role: "client",
};

const validator = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = "Bắt buộc";
  }

  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(values.username)) {
    errors.username = "Email không hợp lệ";
  }

  if (!values.password) {
    errors.password = "Bắt buộc";
  }

  if (
    values.password &&
    (values.password.length < 6 || values.password.length > 50)
  ) {
    errors.password = "Từ 6 - 50 ký tự";
  }

  if (!values.re_password) {
    errors.re_password = "Bắt buộc";
  }

  if (
    values.password &&
    values.re_password &&
    values.re_password !== values.password
  ) {
    errors.re_password = "Mật khẩu nhập lại không chính xác";
  }

  return errors;
};

function CreateUser() {
  const [sendRequest, isLoading, success, error] = useAxios();

  const submitHandler = (values) => {
    sendRequest(
      createUser({
        username: values.username.trim(),
        password: values.password,
        re_password: values.password,
        role: values.role,
      })
    );
  };

  usePageTitle("Thêm user mới");

  const asterisk = <span className="text-danger">*</span>;

  return (
    <>
      <SpinnerModal show={isLoading} />
      <TopBar title="Tạo user mới"></TopBar>
      <div className={styles.container + " p-2"}>
        <Formik
          initialValues={initialValues}
          validate={validator}
          onSubmit={submitHandler}
        >
          <Form className="rounded shadow">
            <label>
              <h6>Email {asterisk}</h6>
              <Field type="text" name="username" className="form-control" />
              <ErrorMessage name="username" component="p" />
            </label>

            <label>
              <h6>Role {asterisk}</h6>
              <Field className="form-select" name="role" as="select">
                <option value="client">client</option>
                <option value="moderator">moderator</option>
                <option value="admin">admin</option>
              </Field>
              <ErrorMessage name="role" component="p" />
            </label>

            <label>
              <h6>Mật khẩu {asterisk}</h6>
              <Field className="form-control" type="password" name="password" />
              <ErrorMessage name="password" component="p" />
            </label>

            <label>
              <h6>Nhập lại mật khẩu {asterisk}</h6>
              <Field
                className="form-control"
                type="password"
                name="re_password"
              />
              <ErrorMessage name="re_password" component="p" />
            </label>

            {success && <p className="text-success">Thành công</p>}
            {error && <p className="text-danger">{error.message}</p>}

            <button className="btn btn-primary" type="submit">
              Tạo user
            </button>
          </Form>
        </Formik>
      </div>
    </>
  );
}

export default CreateUser;
