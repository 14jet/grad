import { Field } from "formik";
import styles from "./ItineraryImgItem.module.css";

function ItineraryImgItem({ imgItem, itiIndex, onRemoveImage }) {
  const { url, imgIndex } = imgItem;

  const removeImg = () => {
    onRemoveImage(itiIndex, imgItem.id);
  };

  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img title="Loại bỏ" src={url} />
        <div className={styles.imgBtns}>
          <button type="button" onClick={removeImg}>
            Loại bỏ
          </button>
        </div>
      </div>

      <Field
        name={`itinerary[${itiIndex}].images[${imgIndex}].caption`}
        placeholder="mô tả"
      />
      <Field
        name={`en.itinerary[${itiIndex}].images[${imgIndex}].caption`}
        placeholder="mô tả tiếng Anh"
      />
    </div>
  );
}

export default ItineraryImgItem;
