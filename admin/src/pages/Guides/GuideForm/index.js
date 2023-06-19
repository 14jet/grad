import { useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { forwardRef } from "react";
import GuideImage from "./GuideImage";
import GuideField from "./GuideField";
import styles from "./GuideForm.module.css";
import { useSelector } from "react-redux";
import RedAsterisk from "../../../components/RedAsterisk";
import FormErrorMessages from "../../../components/FormErrorMessages";
import validator from "./guideValidator";
import { slugify } from "../../../services/helpers/string.helper";

function GuideForm({ onSubmit, initialValues }, ref) {
  const { category } = useSelector((state) => state.guides);

  const submitRef = useRef();

  return (
    <div className={styles.container + " bg-light p-2 shadow rounded"}>
      <>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validate={validator}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {(formik) => {
            return (
              <Form>
                {formik.errors.messages && (
                  <FormErrorMessages messages={formik.errors.messages} />
                )}

                <div>
                  <div className="row">
                    <div className="col-12 col-lg-6">
                      <GuideField
                        label="Tiêu đề"
                        type="text"
                        name="title"
                        isRequired
                      />
                    </div>

                    <div className="col-12 col-lg-6">
                      <GuideField
                        label="Tiêu đề tiếng Anh"
                        type="text"
                        name="en.title"
                        isRequired
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12">
                      <div className="d-flex gap-2 ">
                        <GuideField
                          label="Slug"
                          type="text"
                          name="slug"
                          isRequired
                        />
                        <button
                          type="button"
                          style={{
                            height: "36px",
                            width: "120px",
                            marginTop: "20px ",
                          }}
                          onClick={() => {
                            formik.setFieldValue(
                              "slug",
                              slugify(formik.values.title),
                              false
                            );
                          }}
                        >
                          Tạo tự động
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <GuideField
                        label="Tác giả"
                        type="text"
                        name="author"
                        isRequired
                      />
                    </div>

                  </div>

                  <div className="mb-4">
                    <h6 className="mb-1">
                      Loại <RedAsterisk />
                    </h6>
                    <ul
                      className="d-flex gap-2 p-0 m-0"
                      style={{ listStyleType: "none" }}
                    >
                      {category.map((categoryItem) => (
                        <li key={categoryItem._id} className="m-0">
                          <label className="d-flex gap-2 bg-white p-2 rounded border mb-0">
                            <h6>{categoryItem.name}</h6>
                            <Field
                              type="radio"
                              value={categoryItem._id}
                              name="category"
                              className="w-auto"
                            />
                          </label>
                        </li>
                      ))}
                    </ul>
                    <ErrorMessage
                      name="category"
                      component="p"
                      className="m-0 text-danger"
                    />
                  </div>

                  <div className="row">
                    <div className="col-12 col-lg-6">
                      <GuideField
                        label="Nội dung"
                        type="editor"
                        name="content"
                        isRequired
                        formik={formik}
                      />
                    </div>
                    <div className="col-12 col-lg-6">
                      <GuideField
                        label="Nội dung tiếng Anh"
                        type="editor"
                        name="en.content"
                        isRequired
                        formik={formik}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12 col-lg-4">
                      <GuideImage name="thumb" formik={formik} />
                    </div>
                  </div>
                </div>

                <button
                  ref={ref}
                  hidden
                  type="button"
                  onClick={async () => {
                    const { setFieldTouched, validateForm, values } = formik;
                    setFieldTouched("title", true, true);
                    setFieldTouched("author", true, true);
                    setFieldTouched("content", true, true);
                    setFieldTouched("thumb", true, true);
                    setFieldTouched("category", true, true);
                    setFieldTouched("en.title", true, true);
                    setFieldTouched("en.content", true, true);
                    const errors = await validateForm();
                    const isValid = !Object.keys(errors).length;
                    if (!isValid) return;
                    submitRef.current.click();
                  }}
                >
                  Submit Trigger
                </button>

                <button ref={submitRef} hidden type="submit">
                  Submit
                </button>
              </Form>
            );
          }}
        </Formik>
      </>
    </div>
  );
}

export default forwardRef(GuideForm);
