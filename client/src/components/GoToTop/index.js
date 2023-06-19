import { useTranslation } from "react-i18next";
import styles from "./GoToTop.module.css";

function GoToTop() {
  function goToTopHandler() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  const lang = useTranslation().i18n.language;

  const title = {
    en: "Go to top",
    vi: "Lên đầu trang",
  };

  return (
    <button
      id="goToTop"
      onClick={goToTopHandler}
      className={styles.btn}
      title={title[lang]}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        className="bi bi-caret-up"
        viewBox="0 0 16 16"
      >
        <path d="M3.204 11h9.592L8 5.519 3.204 11zm-.753-.659 4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659z" />
      </svg>
    </button>
  );
}

export default GoToTop;
