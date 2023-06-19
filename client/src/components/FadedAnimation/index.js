import styles from "./FadedAnimation.module.css";

function FadedAnimation({ children }) {
  return <div className={styles.container}>{children}</div>;
}

export default FadedAnimation;
