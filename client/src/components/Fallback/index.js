import styles from "./Fallback.module.css";
import { logo } from "../../assets/svgs";

function Fallback() {
  return (
    <div className={styles.fallback + " bg-dark"}>
      <div className={styles.logo}>
        <span>{logo}</span>
        <p className={styles.domain + " text-light text-center"}>Joya.com.vn</p>
      </div>
    </div>
  );
}

export default Fallback;
