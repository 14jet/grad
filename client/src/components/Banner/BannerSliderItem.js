import styles from "./BannerSliderItem.module.css";
import LLink from "../LLink";
import { useTranslation } from "react-i18next";

function BannerSliderItem({ to, image, alt }) {
  const { t } = useTranslation();

  return (
    <LLink className={styles.sliderItem + " bg-secondary text-light"} to={to}>
      <img src={image} alt={alt} />
      <button className={styles.bannerButton}>{t("buttons.seeNow")}</button>
    </LLink>
  );
}

export default BannerSliderItem;
