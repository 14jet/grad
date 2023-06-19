import { useTranslation } from "react-i18next";
import CardCarousel from "../../components/CardCarousel";
import RoundedButton from "../RoundedButton";
import styles from "./SliderPortion.module.css";

function SliderPortion({ title, cards, error, to }) {
  const { t, i18n } = useTranslation();
  let noProducts = "Không có sản phẩm nào";
  if (i18n.language === "en") {
    noProducts = "No products to display";
  }
  return (
    <div className={styles.container}>
      <h2 className={styles.margin}>{title}</h2>

      {cards.length > 0 && !error && <CardCarousel cards={cards} />}
      {cards.length === 0 && !error && (
        <p className="text-center m-4">{noProducts}</p>
      )}

      {!error && to && (
        <div className={styles.button + " " + styles.margin}>
          {<RoundedButton to={to}>{t("buttons.seeAll")}</RoundedButton>}
        </div>
      )}

      {error && (
        <div
          className={
            styles.error +
            " " +
            styles.margin +
            " bg-secondary d-flex align-items-center justify-content-center"
          }
        >
          <p className="text-light">Error: {error}</p>
        </div>
      )}
    </div>
  );
}

export default SliderPortion;
