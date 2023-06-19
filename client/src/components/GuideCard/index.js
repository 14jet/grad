import LLink from "../LLink";
import styles from "./GuideCard.module.css";
import LazyImg from "../LazyImg";
import { imageDimensions } from "../../services/constants";

function GuideCard({ data }) {
  return (
    <LLink
      className={styles.cartItem + " animation-faded"}
      to={`/guides/bai-viet/${data.slug}`}
    >
      <div className={styles.image}>
        <div className={styles.imageInner}>
          <LazyImg
            src={`${data.thumb}?${imageDimensions.sm}`}
            alt={data.title}
          />
        </div>
      </div>
      <div className={styles.textBox}>
        <h5>{data.title}</h5>
        <p>{data.category.name}</p>
      </div>
    </LLink>
  );
}

export default GuideCard;
