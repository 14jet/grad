import styles from "./GoToTopButton.module.css";
import { chevronDoubleUp as upSVG } from "../../assets/svgs";

function GoToTopButton({ onGoToTop }) {
  return (
    <button
      className={styles.goToTopBtn + "  rounded-circle bg-danger text-light"}
      onClick={onGoToTop}
    >
      {upSVG}
    </button>
  );
}

export default GoToTopButton;
