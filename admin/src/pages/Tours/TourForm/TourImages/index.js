import styles from "./TourImages.module.css";
import { v4 as uuid } from "uuid";

// components
import ItineraryDayImages from "./ItineraryDayImages";

function TourImages({ formik, onSelectImages }) {
  const { values, setValues } = formik;

  const onAddImages = (e, itiIndex, type) => {
    // type: drop | select
    let newFiles = [];
    if (type === "drop") {
      e.preventDefault();
      newFiles = Array.from(e.dataTransfer.files);
    } else {
      newFiles = Array.from(e.target.files);
      if (newFiles.length === 0) return;
    }

    const tempUrls = newFiles.map((file) => URL.createObjectURL(file));
    const currentImages = formik.values.itinerary[itiIndex].images;
    const lastIndex = currentImages.length - 1;

    onSelectImages(
      ...tempUrls.map((tempUrl, tempUrlIndex) => ({
        fieldName: `itinerary[${itiIndex}].images[${
          lastIndex + tempUrlIndex + 1
        }].url`,
        tempSrc: tempUrl,
        file: newFiles[tempUrlIndex],
      }))
    );

    const newImageItems = tempUrls.map((tempUrl) => ({
      id: uuid(),
      caption: "",
      url: tempUrl,
    }));

    let v = formik.values;
    v.itinerary[itiIndex].images = [
      ...v.itinerary[itiIndex].images,
      ...newImageItems,
    ];

    v.en.itinerary[itiIndex].images = [
      ...v.en.itinerary[itiIndex].images,
      ...newImageItems,
    ];

    setValues(v);
  };

  const onRemoveImage = (itiIndex, imgId) => {
    let v = formik.values;
    v.itinerary[itiIndex].images = v.itinerary[itiIndex].images.filter(
      (item) => item.id !== imgId
    );

    v.en.itinerary[itiIndex].images = v.en.itinerary[itiIndex].images.filter(
      (item) => item.id !== imgId
    );

    formik.setValues(v);
  };

  return (
    <div className={styles.container}>
      <div className="pt-3">
        <h4 className="text-center fw-bold pb-4">Hình lộ trình</h4>

        {formik.values.itinerary.length > 0 && (
          <ul className="list-group">
            {formik.values.itinerary.map((iti, itiIndex) => (
              <ItineraryDayImages
                key={iti.id}
                iti={iti}
                itiIndex={itiIndex}
                onRemoveImage={onRemoveImage}
                onAddImages={onAddImages}
              />
            ))}
          </ul>
        )}

        {formik.values.itinerary.length === 0 && (
          <p className="text-center">Chưa có lộ trình</p>
        )}
      </div>
    </div>
  );
}

export default TourImages;
