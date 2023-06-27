import { Formik, Form, Field } from "formik";
import { forwardRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Tabs, Tab } from "react-bootstrap";

// components
import ItineraryForm from "./ItineraryForm";
import Destinations from "./Destinations";
import TourImages from "./TourImages";
import DepartureDates from "./DepartureDates";
import RedAsterisk from "../../../components/RedAsterisk";
import FormErrorMessages from "../../../components/FormErrorMessages";
import FormGroup from "./FormGroup";
// import SetDefaultTermsButton from "./SetDefaultTerms";

// other
import tourValidator from "./tourValidator";
import touchAllFields from "./touchAllFields";
import {
  selectEuCountries,
  selectVnProvinces,
} from "../../../store/place.slice";

// css
import "./TourForm.override.css";
import ImageField from "./ImageField";
import { slugify } from "../../../services/helpers/string.helper";
import DELTA from "../../../services/helpers/quill/emptyDelta";
import { v4 as uuid } from "uuid";

const randomTour = () => ({
  destinations: [],

  code: Date.now().toString().slice(6),
  slug: Date.now().toString(),
  name: Date.now().toString(),
  journey: Date.now().toString(),
  description: DELTA,
  startAt: Date.now().toString(),

  price: "100000",
  days: "1",
  nights: "0",

  departureDates: [new Date()],
  priceIncludes: DELTA,
  priceExcludes: DELTA,
  registrationPolicy: DELTA,
  cancellationPolicy: DELTA,

  thumb: "",

  itinerary: [
    {
      id: uuid(),
      images: [],
      day: "d1",
      destination: "d1",
      content: DELTA,
    },
  ],

  en: {
    name: Date.now().toString(),
    journey: Date.now().toString(),
    description: DELTA,
    startAt: Date.now().toString(),

    priceIncludes: DELTA,
    priceExcludes: DELTA,
    registrationPolicy: DELTA,
    cancellationPolicy: DELTA,

    itinerary: [
      {
        id: uuid(),
        images: [],
        day: "d2",
        destination: "d2",
        content: DELTA,
      },
    ],
  },
});

const emptyTour = {
  destinations: [],

  code: "",
  slug: "",
  name: "",
  journey: "",
  description: DELTA,
  startAt: "",

  price: "",
  days: "1",
  nights: "0",

  departureDates: [],

  priceIncludes: DELTA,
  priceExcludes: DELTA,
  registrationPolicy: DELTA,
  cancellationPolicy: DELTA,

  thumb: "",

  itinerary: [
    {
      id: uuid(),
      images: [],
      day: "",
      destination: "",
      content: DELTA,
    },
  ],

  en: {
    name: "",
    journey: "",
    description: DELTA,
    startAt: "",

    priceIncludes: DELTA,
    priceExcludes: DELTA,
    registrationPolicy: DELTA,
    cancellationPolicy: DELTA,

    itinerary: [
      {
        id: uuid(),
        images: [],
        day: "",
        destination: "",
        content: DELTA,
      },
    ],
  },
};

function TourForm({ initialValues, onSubmit }, ref) {
  const [submitted, setSubmitted] = useState(false);
  const [formikKey, setFormikKey] = useState(0);
  const [images, setImages] = useState(new Map([]));
  const { status: tourStatus } = useSelector((state) => state.tours);
  const { error, status } = useSelector((state) => state.places);
  let eu_countries = useSelector(selectEuCountries);
  let vn_provinces = useSelector(selectVnProvinces);

  const days = Object.keys(new Array(31).fill(1)).slice(1);

  // submit handler
  const submitHandler = async (e, formik) => {
    e.preventDefault();
    if (!submitted) {
      setSubmitted(true);
    }

    touchAllFields(formik);

    const errors = await formik.validateForm();
    if (Object.keys(errors).length > 0) return; // if error > return

    let v = JSON.parse(JSON.stringify(formik.values));
    const fileInputs = Array.from(images.values());

    v.thumb =
      fileInputs.find((item) => item.tempSrc === v.thumb)?.file || v.thumb;

    v.itinerary = v.itinerary.map((iti) => ({
      ...iti,
      images: iti.images.map((img) => {
        const foundFile = fileInputs.find((item) => item.tempSrc === img.url);
        return {
          ...img,
          url: foundFile ? foundFile.file : img.url,
        };
      }),
    }));

    onSubmit(v);
  };

  const onResetFormik = (formik) => {
    if (
      window.confirm(
        "Thao tác này sẽ xóa tất cả các dữ liệu bạn đã nhập. Bạn có chắc muốn thực hiện không?"
      )
    ) {
      formik.setValues(emptyTour);
    }
  };

  const onSelectImages = (...images) => {
    setImages((prev) => {
      images.forEach((image) => {
        if (prev.has(image.fieldName)) {
          URL.revokeObjectURL(prev.get(image.fieldName).tempSrc);
        }
        prev.set(image.fieldName, {
          tempSrc: image.tempSrc,
          file: image.file,
        });
      });

      return prev;
    });
  };

  useEffect(() => {
    if (tourStatus.addTour === "succeeded") {
      Array.from(images.values()).forEach((item) => {
        URL.revokeObjectURL(item.tempSrc);
      });
    }
  }, [tourStatus]);

  const createRandom = (formik) => {
    formik.setValues(randomTour());
  };
  return (
    <div className="bg-light p-2 rounded shadow">
      {error.fetchPlaces && (
        <p className="text-danger mb-1">{error.fetchPlaces.message}</p>
      )}

      {status.fetchPlaces === "succeeded" && (
        <Formik
          initialValues={initialValues}
          validate={tourValidator}
          enableReinitialize
          validateOnChange={false}
          validateOnBlur={false}
          key={formikKey}
        >
          {(formik) => {
            return (
              <Form
                key={formikKey}
                onSubmit={async (e) => {
                  await submitHandler(e, formik);
                }}
              >
                {formik.errors.messages && (
                  <FormErrorMessages messages={formik.errors.messages} />
                )}

                <div className="tourForm pb-2 pt-3">
                  <button
                    type="button"
                    onClick={() => {
                      onResetFormik(formik);
                    }}
                    className="btn btn-warning mb-2"
                  >
                    Reset
                  </button>

                  <button
                    type="button"
                    className="btn btn-primary ms-2 mb-2"
                    onClick={() => {
                      createRandom(formik);
                    }}
                  >
                    Create random
                  </button>
                  <Tabs defaultActiveKey="overview" className=" mb-0 border-0 ">
                    <Tab eventKey="overview" title="Tổng quan">
                      <div className="rounded-0">
                        <div className="row pb-4 border-bottom">
                          <div className="col-12 col-sm-6">
                            <FormGroup
                              isRequired
                              label="Mã tour"
                              component="input"
                              name="code"
                            />
                          </div>
                          <div className="col-12 col-sm-6">
                            <div className="d-flex align-items-end gap-2">
                              <div
                                style={{
                                  flex: 1,
                                }}
                              >
                                <FormGroup
                                  isRequired
                                  label="Slug"
                                  component="input"
                                  name="slug"
                                />
                              </div>
                              <button
                                style={{ height: "36px" }}
                                type="button"
                                className="d-none"
                                onClick={() => {
                                  formik.setFieldValue(
                                    "slug",
                                    slugify(formik.values.name)
                                  );
                                }}
                              >
                                Tạo tự động
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="row pt-4 pb-5 border-bottom">
                          <div className="col-12 col-lg-6 mb-3">
                            <FormGroup
                              isRequired
                              label="Tên tour"
                              component="input"
                              name="name"
                            />
                          </div>
                          <div className="col-12 col-lg-6 mb-3">
                            <FormGroup
                              isRequired
                              label="Tên tour tiếng Anh"
                              component="input"
                              name="en.name"
                            />
                          </div>
                        </div>

                        <div className="row pt-4 pb-5 border-bottom">
                          <div className="col-12 col-lg-6 mb-3">
                            <FormGroup
                              isRequired
                              label="Hành trình"
                              component="textarea"
                              name="journey"
                            />
                          </div>
                          <div className="col-12 col-lg-6 mb-3">
                            <FormGroup
                              isRequired
                              label="Hành trình tiếng Anh"
                              component="textarea"
                              name="en.journey"
                            />
                          </div>
                        </div>

                        <div className="row pt-4 pb-5 border-bottom">
                          <div className="col-12 col-lg-6 mb-3">
                            <FormGroup
                              isRequired
                              label="Mô tả"
                              name="description"
                              type="editor"
                              formik={formik}
                            />
                          </div>
                          <div className="col-12 col-lg-6 mb-3">
                            <FormGroup
                              isRequired
                              label="Mô tả tiếng Anh"
                              name="en.description"
                              type="editor"
                              formik={formik}
                            />
                          </div>
                        </div>

                        <div className="row pt-4 pb-5 border-bottom">
                          <div className="col-12 col-lg-4 mb-3">
                            <FormGroup
                              label="Điểm khởi hành"
                              type="text"
                              name="startAt"
                              formik={formik}
                            />
                          </div>
                          <div className="col-12 col-lg-4 mb-3">
                            <FormGroup
                              label="Điểm khởi hành - tiếng Anh"
                              type="text"
                              name="en.startAt"
                              formik={formik}
                            />
                          </div>
                          <div className="col-12 col-lg-4 mb-3">
                            <DepartureDates formik={formik} />
                          </div>
                        </div>

                        <div className="row pt-4 pb-5">
                          <div className="col-12 col-lg-4 mb-3">
                            <h6 style={{ marginBottom: "2px" }}>
                              Số ngày <RedAsterisk />
                            </h6>

                            <Field
                              className="form-select w-100"
                              as="select"
                              name="days"
                            >
                              {days.map((item) => (
                                <option key={item} value={item}>
                                  {item}
                                </option>
                              ))}
                            </Field>
                          </div>

                          <div className="col-12 col-lg-4 mb-3">
                            <h6 style={{ marginBottom: "2px" }}>
                              Số đêm <RedAsterisk />
                            </h6>

                            <Field
                              className="form-select w-100"
                              as="select"
                              name="nights"
                            >
                              {[0, ...days].map((item) => (
                                <option key={item} value={item}>
                                  {item}
                                </option>
                              ))}
                            </Field>
                          </div>

                          <div className="col-12 col-lg-4 mb-3">
                            <FormGroup
                              isRequired
                              label="Giá"
                              note="(vnd)"
                              type="locale-number"
                              name="price"
                              formik={formik}
                            />
                          </div>
                        </div>
                      </div>
                    </Tab>

                    {/*  price policies   */}
                    <Tab eventKey="price" title="Bảng giá">
                      <div className="row pt-4 pb-5 border-bottom">
                        <div className="col-12 col-lg-6 mb-3">
                          <FormGroup
                            isRequired
                            label="Giá bao gồm"
                            name="priceIncludes"
                            type="editor"
                            formik={formik}
                          />
                        </div>

                        <div className="col-12 col-lg-6 mb-3">
                          <FormGroup
                            isRequired
                            label="Giá bao gồm - tiếng Anh"
                            name="en.priceIncludes"
                            type="editor"
                            formik={formik}
                          />
                        </div>
                      </div>

                      <div className="row pt-4 pb-5 border-bottom">
                        <div className="col-12 col-lg-6 mb-3">
                          <FormGroup
                            isRequired
                            label="Giá không bao gồm"
                            name="priceExcludes"
                            type="editor"
                            formik={formik}
                          />
                        </div>
                        <div className="col-12 col-lg-6 mb-3">
                          <FormGroup
                            isRequired
                            label="Giá không bao gồm - tiếng Anh"
                            name="en.priceExcludes"
                            type="editor"
                            formik={formik}
                          />
                        </div>
                      </div>
                    </Tab>

                    {/*  terms   */}
                    <Tab eventKey="terms" title="Điều khoản">
                      <div className="row pt-4 pb-5 border-bottom">
                        <div className="col-12 col-lg-6 mb-3">
                          <FormGroup
                            isRequired
                            label="Điều kiện đăng ký"
                            name="registrationPolicy"
                            type="editor"
                            formik={formik}
                          />
                        </div>
                        <div className="col-12 col-lg-6 mb-3">
                          <FormGroup
                            isRequired
                            label="Điều kiện đăng ký tiếng Anh"
                            name="en.registrationPolicy"
                            type="editor"
                            formik={formik}
                          />
                        </div>
                      </div>

                      <div className="row pt-4 pb-5 border-bottom">
                        <div className="col-12 col-lg-6 mb-3">
                          <FormGroup
                            isRequired
                            label="Điều kiện hoàn hủy"
                            name="cancellationPolicy"
                            type="editor"
                            formik={formik}
                          />
                        </div>
                        <div className="col-12 col-lg-6 mb-3">
                          <FormGroup
                            isRequired
                            label="Điều kiện hoàn hủy tiếng Anh"
                            name="en.cancellationPolicy"
                            type="editor"
                            formik={formik}
                          />
                        </div>
                      </div>
                    </Tab>

                    {/* ----------------------- điểm đến ------------------------  */}

                    <Tab eventKey="destinations" title="Điểm đến">
                      <div className="row">
                        <div className="col-12 col-md-6  border-end">
                          <Destinations
                            title="Tour trong nước"
                            places={vn_provinces}
                            formik={formik}
                          />
                        </div>

                        <div className="col-12 col-md-6">
                          <Destinations
                            title="Tour châu Âu"
                            places={eu_countries}
                            formik={formik}
                          />
                        </div>
                      </div>
                    </Tab>

                    {/* ----------------------- lộ trình ------------------------  */}
                    <Tab eventKey="itinerary" title="Lộ trình">
                      <ItineraryForm
                        itinerary={formik.values.itinerary}
                        formik={formik}
                        name="itinerary"
                      />
                    </Tab>

                    {/* ----------------------- hình ảnh: thumbnail,  lộ trình ------------------------  */}
                    <Tab eventKey="images" title="Hình ảnh">
                      <div className="border-bottom row pb-4">
                        <div className="col-6">
                          <ImageField
                            isRequired
                            label="Ảnh đại diện"
                            name="thumb"
                            formik={formik}
                            onSelectImages={onSelectImages}
                          />
                        </div>
                      </div>

                      <div className="pt-3">
                        <TourImages
                          formik={formik}
                          onSelectImages={onSelectImages}
                        />
                      </div>
                    </Tab>
                  </Tabs>
                </div>

                <button type="submit" ref={ref} hidden />
              </Form>
            );
          }}
        </Formik>
      )}
    </div>
  );
}

export default forwardRef(TourForm);
