import { Field, ErrorMessage } from "formik";
import Editor from "../../../containers/Editor";
import RedAsterisk from "../../../components/RedAsterisk";
import styles from "./GuideForm.module.css";

const getNestedObj = (obj, str) => {
  try {
    return str.split(".").reduce((o, i) => o[i], obj);
  } catch (error) {
    return null;
  }
};

function GuideField({ label, name, formik, isRequired, type }) {
  if (type === "editor")
    return (
      <div className={styles.label}>
        <h6>
          {label} {isRequired && <RedAsterisk />}
        </h6>
        <div className={styles.quillEditor}>
          <Editor
            placeholder="Nội dung"
            onChange={(delta) => formik.setFieldValue(name, delta)}
            initialValue={getNestedObj(formik.values, name)}
            onBlur={() => formik.setFieldTouched(name, true, true)}
          />
        </div>
      </div>
    );

  return (
    <label>
      <h6>
        {label} {isRequired && <RedAsterisk />}
      </h6>

      <Field type={type} name={name} />
    </label>
  );
}

export default GuideField;
