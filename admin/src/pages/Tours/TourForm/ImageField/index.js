import styles from "./ImageField.module.css";
import RedAsterisk from "../../../../components/RedAsterisk";

function ImageField({ formik, name, onSelectImages, label, note, isRequired }) {
  const { values, setFieldValue } = formik;

  // chọn file bằng drop
  const dropHandler = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 1) return; // drop more than 1 file > do nothing

    const file = files[0];
    const tempSrc = URL.createObjectURL(file);
    onSelectImages({
      fieldName: name,
      tempSrc,
      file,
    });
    setFieldValue(name, tempSrc);
  };

  // chọn file bình thường
  const selectOneImageHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const tempSrc = URL.createObjectURL(file);
    onSelectImages({
      fieldName: name,
      tempSrc,
      file,
    });
    setFieldValue(name, tempSrc);
  };

  const preventDefault = (e) => {
    e.preventDefault();
  };
  return (
    <div className={styles.container}>
      <h6 className={styles.label}>
        {label} {note && <em>{note}</em>} {isRequired && <RedAsterisk />}
      </h6>
      <label
        onDragEnter={preventDefault}
        onDragOver={preventDefault}
        onDrop={dropHandler}
      >
        <div className={styles.image}>
          {values[name] && (
            <img className="img-fluid w-100 h-100" src={values[name]} />
          )}
          {!values[name] && <p className={styles.plusImage}>+</p>}
        </div>
        <input
          type="file"
          name={name}
          hidden
          onChange={selectOneImageHandler}
        />
      </label>
    </div>
  );
}

export default ImageField;
