import { Link, useNavigate } from "react-router-dom";
import Container from "../../components/Container";
import { useTranslation } from "react-i18next";

import styles from "./ErrorPage.module.css";
import LLink from "../../components/LLink";
import usePageTitle from "../../hooks/usePageTitle";

const trans = {
  goHome: {
    en: "Go to home",
    vi: "Về trang chủ",
  },
  goBack: {
    en: "Go back",
    vi: "Quay lại",
  },
  somethingWrongHappened: {
    en: "Something wrong happened",
    vi: "Đã có lỗi xảy ra",
  },
  pageNotFound: {
    en: "Page Not Found",
    vi: "Trang bạn yêu cầu không tồn tại",
  },
};

function ErrorPage({ code, message }) {
  const lang = useTranslation().i18n.language;

  const navigate = useNavigate();

  // code
  let httpCode =
    code && false ? (
      code.toString()
    ) : (
      <>
        <span>O</span>ops!
      </>
    );
  let codeContent = httpCode;
  if (httpCode.length === 3) {
    codeContent = (
      <>
        {httpCode[0]}
        <span>{httpCode[1]}</span>
        {httpCode[2]}
      </>
    );
  }

  const goBackHandler = () => {
    navigate(-1);
  };

  usePageTitle(message);

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h1 className={styles.number}>{codeContent}</h1>
        <h2 className={styles.text}>{message}</h2>

        <div className={styles.buttons}>
          <LLink to="/">{trans.goHome[lang]}</LLink>
          <button onClick={goBackHandler}>{trans.goBack[lang]}</button>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
