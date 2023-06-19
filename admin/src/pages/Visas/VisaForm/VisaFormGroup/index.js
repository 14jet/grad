import Editor from "../../../../containers/Editor";

const getNestedObj = (obj, str) => {
  try {
    return str.split(".").reduce((o, i) => o[i], obj);
  } catch (error) {
    return null;
  }
};

function VisaFormGroup({ label, type, name, placeholder, formik }) {
  if (type === "editor") {
    return (
      <div className="pb-4">
        <p className="mb-0 pb-1 fw-bold">{label}</p>
        <div className="bg-white">
          <Editor
            placeholder={placeholder}
            initialValue={getNestedObj(formik.values, name)}
            onChange={(delta) => formik.setFieldValue(name, delta)}
          />
        </div>
      </div>
    );
  }
}

export default VisaFormGroup;
