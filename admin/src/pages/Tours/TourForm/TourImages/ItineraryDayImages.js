import styles from "./ItineraryDayImages.module.css";
import ItineraryImgItem from "./ItineraryImgItem";

function ItineraryDayImages({ iti, itiIndex, onRemoveImage, onAddImages }) {
  const preventDefault = (e) => {
    e.preventDefault();
  };

  const clearPrevChosenImages = (e) => {
    e.target.value = null;
  };

  const onDrop = (e) => {
    onAddImages(e, itiIndex, "drop");
  };

  const onChange = (e) => {
    onAddImages(e, itiIndex, "select");
  };
  return (
    <li className="mb-4 border-bottom pb-2">
      <p className="mb-0 fw-bold">
        {iti.day || <span className="text-danger">Chưa có tiêu đề</span>}
      </p>
      <p className="mb-1 fw-bold">
        {iti.destination || (
          <span className="text-danger">Chưa có địa điểm</span>
        )}
      </p>

      <ul
        className={styles.dropZone}
        onDragEnter={preventDefault}
        onDragOver={preventDefault}
        onDrop={onDrop}
      >
        {iti.images.map((imgItem, imgIndex) => (
          <li key={imgItem.id}>
            <ItineraryImgItem
              imgItem={{ ...imgItem, imgIndex }}
              itiIndex={itiIndex}
              onRemoveImage={onRemoveImage}
            />
          </li>
        ))}

        <li>
          <label>
            <div className={styles.addImage}>
              <p className={styles.plusMark}>+</p>
            </div>
            <input
              type="file"
              hidden
              multiple
              onClick={clearPrevChosenImages}
              onChange={onChange}
            />
          </label>
        </li>
      </ul>
    </li>
  );
}

export default ItineraryDayImages;
