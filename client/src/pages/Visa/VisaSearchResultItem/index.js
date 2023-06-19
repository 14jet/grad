import { useTranslation } from "react-i18next";
import LLink from "../../../components/LLink";
import { imageDimensions } from "../../../services/constants";
import styles from "./VisaSearchResultItem.module.css";

function VisaSearchResultItem({ visa }) {
  const { t } = useTranslation();
  return (
    <LLink
      to={`/dich-vu-visa/${visa.slug}`}
      className={styles.visaSearchResultItem}
    >
      <div className={styles.image}>
        <img src={`${visa.image}?${imageDimensions.xsm}`} />
      </div>
      <span className={styles.visaName + " text-dark"}>
        <strong>
          {t("pages.visaServices.visaTo")} {visa.name}
        </strong>
      </span>
    </LLink>
  );
}

export default VisaSearchResultItem;
