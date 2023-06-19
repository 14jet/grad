import { placeholder } from "../../../assets/images";
import styles from "./CardPlaceholder.module.css";

function CardPlaceholder({ children }) {
  return (
    <div className={styles.card} aria-hidden="true">
      <div
        className={styles.image}
        style={{ backgroundImage: `url(${placeholder})` }}
      ></div>
      <div className={styles.textBox}>{children}</div>
    </div>
  );
}

export default CardPlaceholder;
