import Editor from "../../../containers/Editor";

function TermTab({ initialValue, name, formik, label }) {
  const changeHandler = (delta) => {
    console.log(name);
    console.log(delta);
    formik.setFieldValue(name, delta);
  };

  return (
    <div className="bg-light mb-5">
      <h6 className="text-center">{label}</h6>
      <div className="bg-white">
        <Editor
          placeholder="Nhập nội dung..."
          initialValue={initialValue}
          onChange={changeHandler}
        />
      </div>
    </div>
  );
}

export default TermTab;
