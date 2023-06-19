import React from "react";
import { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import styles from "./NotifyModal.module.css";

const checkCircle = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6"
  >
    <path
      fillRule="evenodd"
      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
      clipRule="evenodd"
    />
  </svg>
);

const errorSVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
    />
  </svg>
);

function NotifyModal({
  time,
  message,
  type = "normal",
  leftBtn,
  rightBtn,
  btn,
  ...props
}) {
  useEffect(() => {
    if (time && props.show) {
      setTimeout(() => {
        if (btn?.cb) {
          btn.cb();
        }

        if (props.onHide) {
          props.onHide();
        }
      }, time);
    }
  }, [props.show]);

  let contentClasses = styles.content;
  if (type === "success") {
    contentClasses += " " + styles.success;
  }

  if (type === "error") {
    contentClasses += " " + styles.error;
  }

  let btnClasses = styles.btn;
  if (type === "error") {
    btnClasses += " " + styles.errorBtn;
  }
  if (type === "success") {
    btnClasses += " " + styles.successBtn;
  }
  return (
    <Modal
      {...props}
      dialogClassName={styles.modal + " modal-dialog-centered"}
      contentClassName={contentClasses}
    >
      <div className={styles.header}>
        {type === "success" ? checkCircle : errorSVG}
      </div>
      <div className="pt-2">
        <p className="text-center">{message}</p>
        {leftBtn && rightBtn && (
          <div className="pb-2 d-flex gap-2 justify-content-center">
            <leftBtn.component
              to={leftBtn.to}
              onClick={leftBtn.cb}
              className={btnClasses + " " + styles.leftBtn}
            >
              {leftBtn.text}
            </leftBtn.component>
            <rightBtn.component
              className={styles.btn}
              to={rightBtn.to}
              onClick={rightBtn.cb || props.onHide}
            >
              {rightBtn.text || "Cancel"}
            </rightBtn.component>
          </div>
        )}

        {btn && (
          <div className="pb-2 d-flex  justify-content-center">
            <btn.component
              state={btn.state}
              to={btn.to}
              onClick={btn.cb}
              className={btnClasses}
            >
              OK
            </btn.component>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default NotifyModal;
