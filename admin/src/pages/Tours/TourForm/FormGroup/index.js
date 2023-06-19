import { Field } from "formik";
import Editor from "../../../../containers/Editor";
import RedAsterisk from "../../../../components/RedAsterisk";
import LocaleNumberInput from "../../../../components/LocaleNumberInput";
import styles from "./FormGroup.module.css";

const getNestedObj = (obj, str) => {
  try {
    return str.split(".").reduce((o, i) => o[i], obj);
  } catch (error) {
    return null;
  }
};

function FormGroup(props) {
  const { isRequired, label, note, component, type, name, formik, ...other } =
    props;

  // label
  let form_label = (
    <h6 className={styles.label}>
      {label} {note && <em>{note}</em>} {isRequired && <RedAsterisk />}
    </h6>
  );

  // field
  let form_field = (
    <Field component={component} type={type} name={name} {...other} />
  );

  if (type === "file") {
    const { values, setFieldValue } = formik;
    const src =
      typeof values[name] === "string"
        ? values[name]
        : URL.createObjectURL(values[name]);

    // chọn file bằng drop
    const dropHandler = (e) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files);
      if (files.length > 1) return; // drop hơn 1 hình thì không làm gì
      setFieldValue(name, Array.from(e.dataTransfer.files)[0], false);
    };

    // chọn file bình thường
    const changeHandler = (e) => {
      if (e.target.files[0]) {
        setFieldValue(name, Array.from(e.target.files)[0], false);
      }
    };

    form_field = (
      <label
        onDragEnter={(e) => e.preventDefault()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={dropHandler}
      >
        <div className={styles.image}>
          {values[name] && <img className="img-fluid w-100 h-100" src={src} />}
          {!values[name] && <p className={styles.plusImage}>+</p>}
        </div>
        <input type="file" name={name} hidden onChange={changeHandler} />
      </label>
    );
  }

  if (type === "editor") {
    const { setFieldValue, setFieldTouched, values } = formik;
    const changeHandler = (delta) => {
      setFieldValue(name, delta, false);
    };

    const blurHandler = () => {
      setFieldTouched(name, true, true);
    };

    const initialValue = getNestedObj(values, name);

    form_field = (
      <div className={styles.editor}>
        <Editor
          initialValue={initialValue}
          onChange={changeHandler}
          onBlur={blurHandler}
        />
      </div>
    );
  }

  if (type === "locale-number") {
    const { setFieldValue, values } = formik;

    form_field = (
      <LocaleNumberInput
        value={values[name]}
        onChange={(number) => setFieldValue(name, number)}
      />
    );
  }

  return (
    <div className={styles.container}>
      {form_label}
      {form_field}
    </div>
  );
}

export default FormGroup;
