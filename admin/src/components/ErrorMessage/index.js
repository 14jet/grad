import * as svg from "../../assets/svgs";
import styles from "./ErrorMessage.module.css";

function ErrorMessage({ msg }) {
  if (!msg) {
    return null;
  }

  return (
    <h2 className={styles.errorMessage}>
      {svg.exclamation} {msg}
    </h2>
  );
}

export default ErrorMessage;
