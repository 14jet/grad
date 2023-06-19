import LLink from "../../components/LLink";
import styles from "./Visa.module.css";
import { imageDimensions } from "../../services/constants";
import { useTranslation } from "react-i18next";

function VisaSliderItem({ visa }) {
  const { t } = useTranslation();
  return (
    <div>
      <LLink to={`/dich-vu-visa/${visa.slug}`}>
        <div className={styles.visaProduct}>
          <div className={styles.image}>
            <img src={`${visa.image}?${imageDimensions.sm}` || "empty"} />
          </div>
          <p className="text-dark p-2 hover-underline">
            {t("pages.visaServices.visaTo")} {visa.name}
          </p>
        </div>
      </LLink>
    </div>
  );
}

export default VisaSliderItem;
