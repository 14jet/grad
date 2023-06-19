import { Modal } from "react-bootstrap";
import { Field, ErrorMessage } from "formik";
import NotifyModal from "../NotifyModal";
import styles from "./CustomModal.module.css";
import RedAsterisk from "../RedAsterisk";

function CloseButton({ className, ...props }) {
  let classes = styles.closeButton;
  if (className) {
    classes += " " + className;
  }
  return (
    <button className={classes} {...props}>
      x
    </button>
  );
}

function CustomModal(props) {
  const {
    children,
    isLoading,
    title,
    success,
    error,
    formik,
    submitRef,
    submitButtonText,
    ...other
  } = props;

  const { isSuccess, message, cb } = success;

  let notify = {};
  if (isSuccess) {
    notify = {
      type: "success",
      message: message,
      btn: {
        component: "button",
        cb: cb,
      },
      show: isSuccess,
    };
  }

  const submitTrigger = () => {
    if (submitRef.current) {
      submitRef.current.click();
    }
  };

  const spinner = (
    <div className={styles.spinner}>
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );

  return (
    <>
      <NotifyModal {...notify} />
      <Modal {...other}>
        {isLoading && spinner}
        <div className="p-3">
          <h5 className="border-bottom pb-3">{title}</h5>
          <CloseButton
            onClick={() => {
              console.log("click");
              other.onHide();
            }}
            className={styles.closeBtn}
          />

          <div className={styles.formBody}>{children}</div>
          <div className="pt-2 border-top mt-2">
            {error && <p className="text-danger">{error.message}</p>}
            <button
              className="btn btn-primary"
              type="submit"
              onClick={submitTrigger}
            >
              {submitButtonText || "Submit"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default CustomModal;

export const FormGroup = ({
  label,
  gender,
  children,
  isRequired,
  ...props
}) => {
  let Component = Field;

  return (
    <label className={styles.label}>
      <h6>
        {label}
        {isRequired && <RedAsterisk />}
      </h6>
      <Component {...props}>{children}</Component>
      <ErrorMessage
        name={props.name}
        className="text-danger m-0"
        component="p"
      />
    </label>
  );
};
