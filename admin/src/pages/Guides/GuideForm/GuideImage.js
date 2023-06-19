import { ErrorMessage } from "formik";
import styles from "./GuideForm.module.css";

function GuideImage({ name, formik }) {
  const previewImageHandler = (img) =>
    typeof img === "string" ? img : URL.createObjectURL(img);

  const title = name === "thumb" ? "Hình thumbnail" : "Hình banner";

  return (
    <>
      <h6>
        {title} <em>(bắt buộc)</em>
      </h6>

      <label
        className={styles.imgLabel}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const files = Array.from(e.dataTransfer.files);
          if (files.length > 1) return;
          formik.setFieldValue(name, files[0]);
        }}
      >
        <input
          type="file"
          hidden
          onChange={(e) => {
            const files = Array.from(e.target.files);
            if (!files.length || files.length > 1) return;
            formik.setFieldValue(name, e.target.files[0]);
          }}
        />

        {!formik.values[name] && (
          <div className={styles.plusImg}>
            <p>Nhấn chọn hoặc kéo thả hình</p>
          </div>
        )}

        {formik.values[name] && (
          <img src={previewImageHandler(formik.values[name])} />
        )}
      </label>

      <ErrorMessage name="thumb" component="p" className="text-danger" />
    </>
  );
}

export default GuideImage;
