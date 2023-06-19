import React from "react";
import { useTranslation } from "react-i18next";
import {
  check,
  victoryFingers,
  holdingHands,
} from "../../../assets/images/index";
import styles from "./Intro.module.css";
import FadedAnimation from "../../../components/FadedAnimation";

function HomeHeader() {
  const { t } = useTranslation();

  return (
    <FadedAnimation>
      <div className={styles.header}>
        <div className={styles.container}>
          <div className={styles.about}>
            <div className="col-12 col-md-4 col-lg-4">
              <img src={check} alt="check" />
              <h6>{t("pages.home.intro.highClassService.title")}</h6>
              <p>{t("pages.home.intro.highClassService.content")}</p>
            </div>
            <div className="col-12 col-md-4 col-lg-4">
              <img src={victoryFingers} alt="vicotry" />
              <h6>{t("pages.home.intro.impressiveJourney.title")}</h6>
              <p>{t("pages.home.intro.impressiveJourney.content")}</p>
            </div>
            <div className="col-12 col-md-4 col-lg-4">
              <img src={holdingHands} alt="holding hands" />
              <h6>{t("pages.home.intro.trustedPartner.title")}</h6>
              <p>{t("pages.home.intro.trustedPartner.content")}</p>
            </div>
          </div>
        </div>
      </div>
    </FadedAnimation>
  );
}
export default HomeHeader;
