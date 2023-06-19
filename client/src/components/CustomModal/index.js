import { Modal } from "react-bootstrap";
import CloseButton from "../CloseButton";
import { Field, ErrorMessage } from "formik";
import SpinnerModal from "../SpinnerModal";
import NotifyModal from "../NotifyModal";
import styles from "./CustomModal.module.css";
import RedAsterisk from "../RedAsterisk";
import { useRef, useState, useEffect } from "react";
import Calendar from "../../components/Calendar";

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

  return (
    <>
      <NotifyModal {...notify} />
      <Modal {...other} contentClassName={styles.modalContent}>
        {isLoading && <SpinnerModal />}
        <div className="p-3">
          <div className={styles.header + " border-bottom mb-2"}>
            <h5 className={styles.title}>{title}</h5>
            <CloseButton
              onClick={() => {
                console.log("click");
                other.onHide();
              }}
              className={styles.closeBtn}
            />
          </div>

          <div className={styles.formBody}>{children}</div>
          {error && <p className="text-danger">{error.message}</p>}
          <button
            className="btn bg-dark text-light"
            type="submit"
            onClick={submitTrigger}
          >
            {submitButtonText || "Submit"}
          </button>
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

export const DateFormGroup = ({
  name,
  label,
  onSelect,
  availableDates,
  placeholder,
  isRequired,
  selectedDate,
  flexible,
}) => {
  const [showCalendar, setShowCalendar] = useState();
  const calendarRef = useRef();
  const dateLabelRef = useRef();

  useEffect(() => {
    if (showCalendar) {
      const handler = (e) => {
        if (
          !calendarRef.current.contains(e.target) &&
          !dateLabelRef.current.contains(e.target)
        ) {
          setShowCalendar(false);
        }
      };

      window.addEventListener("click", handler);

      return () => window.removeEventListener("click", handler);
    }
  }, [showCalendar]);

  return (
    <div className={styles.dateField + " " + styles.label}>
      <h6>
        {label}
        {isRequired && <RedAsterisk />}
      </h6>

      <input
        ref={dateLabelRef}
        onClick={(e) => {
          e.preventDefault();
          setShowCalendar((prev) => !prev);
        }}
        type="text"
        readOnly
        onFocus={(e) => e.preventDefault()}
        placeholder={placeholder}
      />

      {showCalendar && (
        <div ref={calendarRef} className={styles.calendar}>
          <Calendar
            availableDates={availableDates}
            onSelect={(d) => {
              onSelect(d);
              setShowCalendar(false);
            }}
            selectedDate={selectedDate}
            flexible={flexible}
          />
        </div>
      )}
      <ErrorMessage name={name} className="text-danger" component="p" />
    </div>
  );
};
