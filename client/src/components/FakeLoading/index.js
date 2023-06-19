import styles from "./FakeLoading.module.css";
import Logo from "../Logo";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function FakeLoading({ seconds = 500 }) {
  const [show, setShow] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (show) {
      let timeOut = setTimeout(() => {
        setShow(false);
      }, seconds);

      return () => {
        clearTimeout(timeOut);
      };
    }
  }, [show]);

  useEffect(() => {
    setShow(true);
  }, [location]);

  //   return null;
  if (!show) return null;

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.logo}>
          <Logo light />
        </div>
        <p className={styles.uri}>vvvv.space</p>
      </div>
    </div>
  );
}

export default FakeLoading;
