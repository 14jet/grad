import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import FadedAnimation from "../../components/FadedAnimation";

function DefaultLayout() {
  return (
    <div className={styles.main}>
      <Navbar />
      <div className={styles.body}>
        <FadedAnimation>
          <Outlet />
        </FadedAnimation>
      </div>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
