import { useTranslation } from "react-i18next";
import styles from "./TourCard.module.css";
import LLink from "../../components/LLink";
import LazyImg from "../LazyImg";
import { imageDimensions } from "../../services/constants";

function TourCard({ data }) {
  const { thumb, name, price, days, nights, slug } = data;
  const { t } = useTranslation();

  let destination = "";
  destination = data.destinations.map((item) => item.name).join(", ");

  return (
    <div className={styles.card + " animation-faded"}>
      <LLink to={`/du-lich/${slug}`}>
        <div className={styles.img}>
          <LazyImg src={`${thumb}?${imageDimensions.sm}`} alt={name} />
        </div>

        <div className={styles.textBox}>
          <h5 className="text-uppercase">{name}</h5>
          <p>{destination}</p>
          <p>
            {days}{" "}
            {days > 1 ? t("general.days") : t("general.day")}{" "}
            {nights}{" "}
            {nights > 1 ? t("general.nights") : t("general.night")}
          </p>
          <p>
            {t("general.fullPackage")}:{" "}
            <strong>{price.toLocaleString()} vnđ</strong>
          </p>
        </div>
      </LLink>
    </div>
  );
}

export default TourCard;
