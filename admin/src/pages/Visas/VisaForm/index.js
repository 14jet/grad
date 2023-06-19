// main
import { Formik, Form, Field } from "formik";
import { Tabs, Tab } from "react-bootstrap";
import { forwardRef, useRef, useState } from "react";
import { useSelector } from "react-redux";

// components
import VisaFormGroup from "./VisaFormGroup";
import LocaleNumberInput from "../../../components/LocaleNumberInput";
import FormErrorMessages from "../../../components/FormErrorMessages";

// other
import validator from "./visaValidator";
// css
import styles from "./VisaForm.module.css";
import "./VisaForm.override.css";
import { slugify } from "../../../services/helpers/string.helper";

function VisaForm({ onSubmit, initialValues }, ref) {
  const [formErrors, setFormErrors] = useState([]);

  const submitRef = useRef();

  const validateBeforeSubmit = async (formik) => {
    const errors = await formik.validateForm();

    if (Array.from(Object.keys(errors)).length === 0) {
      submitRef.current.click();
    } else {
      setFormErrors(errors.messages);
    }
  };

  const submitHandler = (values) => {
    onSubmit(values);
  };

  const destinations = useSelector((state) => state.places.places);

  const countries = destinations.filter((item) => item.type === "country");

  return (
    <div className={styles.visaForm + " visaForm p-2 bg-light shadow rounded"}>
      {formErrors.length > 0 && <FormErrorMessages messages={formErrors} />}

      <Formik
        initialValues={initialValues}
        validate={validator}
        onSubmit={submitHandler}
        enableReinitialize
        validateOnChange={false}
      >
        {(formik) => (
          <Form>
            <Tabs defaultActiveKey="generalInfo">
              <Tab
                eventKey="generalInfo"
                title="Thông tin chung"
                className="p-2 bg-white"
              >
                <div className="row">
                  <div className="col-12 col-lg-6">
                    <div className={styles.formGroup}>
                      <p className={styles.label}>Tên visa</p>
                      <Field type="text" name="name" />
                    </div>
                  </div>

                  <div className="col-12 col-lg-6">
                    <div className={styles.formGroup}>
                      <p className={styles.label}>Tên visa Tiếng Anh</p>
                      <Field type="text" name="en.name" />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <div className="d-flex gap-2">
                      <div className={styles.formGroup + " w-100"}>
                        <p className={styles.label}>Slug</p>
                        <Field type="text" name="slug" />
                      </div>
                      <button
                        style={{
                          height: "36px",
                          marginTop: "22px",
                          width: "120px",
                        }}
                        type="button"
                        onClick={() => {
                          formik.setFieldValue(
                            "slug",
                            slugify(formik.values.name),
                            false
                          );
                        }}
                      >
                        Tạo tự động
                      </button>
                    </div>
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-6">
                    <label>
                      <h6>Giá (USD)</h6>
                      <LocaleNumberInput
                        placeholder="giá"
                        className="p-2"
                        value={formik.values.price}
                        onChange={(number) => {
                          formik.setFieldValue("price", number);
                        }}
                      />
                    </label>
                  </div>

                  <div className="col-6">
                    <h6>Nước</h6>

                    <Field as="select" name="country" className="p-2">
                      <option value="">---</option>
                      {countries.map((item) => (
                        <option
                          className="d-flex align-items-center me-2 border p-2 bg-white rounded"
                          value={item._id}
                          key={item._id}
                        >
                          {item.name}
                        </option>
                      ))}
                    </Field>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 col-lg-6">
                    <div className="bg-white">
                      <VisaFormGroup
                        formik={formik}
                        type="editor"
                        label="Chi tiết phiếu dịch vụ"
                        name="detail"
                      />
                    </div>
                  </div>

                  <div className="col-12 col-lg-6">
                    <div className="bg-white">
                      <VisaFormGroup
                        formik={formik}
                        type="editor"
                        label="Chi tiết phiếu dịch vụ Tiếng Anh"
                        name="en.detail"
                      />
                    </div>
                  </div>
                </div>
              </Tab>

              <Tab eventKey="terms" title="Điều khoản" className="p-2 bg-white">
                <div className="row">
                  <div className="col-12 col-lg-6">
                    <VisaFormGroup
                      formik={formik}
                      type="editor"
                      label="Chính sách hoàn hủy đổi"
                      name="terms.cancellation"
                    />
                  </div>
                  <div className="col-12 col-lg-6">
                    <VisaFormGroup
                      formik={formik}
                      type="editor"
                      label="Chính sách hoàn hủy đổi Tiếng Anh"
                      name="en.terms.cancellation"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 col-lg-6">
                    <VisaFormGroup
                      formik={formik}
                      type="editor"
                      label="Điều khoản chung"
                      name="terms.notes"
                    />
                  </div>
                  <div className="col-12 col-lg-6">
                    <VisaFormGroup
                      formik={formik}
                      type="editor"
                      label="Điều khoản chung Tiếng Anh"
                      name="en.terms.notes"
                    />
                  </div>
                </div>
              </Tab>

              <Tab eventKey="price" title="Bảng giá" className="p-2  bg-white">
                <div className="row">
                  <div className="col-12 col-lg-6">
                    <VisaFormGroup
                      formik={formik}
                      label="Giá bao gồm"
                      name="price_policies.includes"
                      type="editor"
                    />
                  </div>
                  <div className="col-12 col-lg-6">
                    <VisaFormGroup
                      formik={formik}
                      label="Giá bao gồm Tiếng Anh"
                      name="en.price_policies.includes"
                      type="editor"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 col-lg-6">
                    <VisaFormGroup
                      formik={formik}
                      label="Giá không bao gồm"
                      name="price_policies.excludes"
                      type="editor"
                    />
                  </div>
                  <div className="col-12 col-lg-6">
                    <VisaFormGroup
                      formik={formik}
                      label="Giá không bao gồm Tiếng Anh"
                      name="en.price_policies.excludes"
                      type="editor"
                    />
                  </div>
                </div>
              </Tab>
            </Tabs>

            <button
              ref={submitRef}
              hidden
              className="btn btn-primary"
              type="submit"
            >
              Lưu
            </button>

            <button
              type="button"
              hidden
              onClick={() => {
                console.log("hehe");
                validateBeforeSubmit(formik);
              }}
              ref={ref}
            >
              Validate before submit Button
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default forwardRef(VisaForm);
