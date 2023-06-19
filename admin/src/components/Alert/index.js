import { useEffect, useState } from "react";
import styles from "./Alert.module.css";

function Alert({ time = 5000, children, onHide }) {
  const closeSVG = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-x-lg"
      viewBox="0 0 16 16"
    >
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
    </svg>
  );

  useEffect(() => {
    setTimeout(() => {
      onHide();
    }, time);
  }, []);

  return (
    <div className={styles.container}>
      <p>{children}</p>
      <button onClick={onHide}>{closeSVG}</button>
    </div>
  );
}

export default Alert;
