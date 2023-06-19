import DELTA from "../../../../services/helpers/quill/emptyDelta";
import {
  // main
  useEffect,
  useState,
  Accordion,

  // components
  Editor,

  // other
  uuid,

  // css
  styles,
} from "./UpdateItinerary.import";
import "./UpdateItinerary.override.css";
import DeleteDayButton from "./DeleteDayButton";
import { Field } from "formik";

function ItineraryForm({ formik, name }) {
  const [firstRender, setFirstRender] = useState(true);
  const [scrollDown, setScrollDown] = useState(1);
  const [openLastItem, setOpenLastItem] = useState(1);
  const { setFieldValue, values, setFieldTouched, setValues } = formik;

  // thêm ngày, chỉ có ở tiếng Việt
  // khi thêm ngày thì thêm luôn ở bản en
  const addDayHandler = () => {
    const newItem = {
      id: uuid(),
      day: "",
      destination: "",
      content: DELTA,
      images: [],
    };

    setValues({
      ...values,
      itinerary: [...values.itinerary, newItem],
      en: {
        ...values.en,
        itinerary: [...values.en.itinerary, newItem],
      },
    });

    setOpenLastItem((prev) => prev + 1);
  };

  // remove ngày handler
  // chỉ có ở tiếng Việt
  // khi xóa 1 ngày ở tiếng Việt thì xóa ngày tương ứng trong bản en
  const removeHandler = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa ngày này không?")) {
      setValues({
        ...values,
        itinerary: values.itinerary.filter((item) => item.id !== id),
        en: {
          ...values.en,
          itinerary: values.en.itinerary.filter((item) => item.id !== id),
        },
      });
    }
  };

  useEffect(() => {
    if (openLastItem === 1) return;

    const className = ".itinerary-" + (values.itinerary.length - 1);
    const btn = document.querySelector(className + " .accordion-button");
    btn.click();
    setScrollDown((prev) => prev + 1);
  }, [openLastItem]);

  useEffect(() => {
    if (scrollDown === 1) return;

    setTimeout(() => {
      const scrollingElement = document.getElementById("admin__content");
      scrollingElement.scroll({
        top: scrollingElement.scrollHeight,
        behavior: "smooth",
      });
    }, 300);
  }, [scrollDown]);

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
      if (values.itinerary.length === 1) {
        const className = ".itinerary-" + (values.itinerary.length - 1);
        const btn = document.querySelector(className + " .accordion-button");
        btn.click();
      }
    }
  }, [firstRender]);

  const resetHandler = () => {
    const newItem = {
      id: uuid(),
      day: "",
      destination: "",
      content: DELTA,
      images: [],
    };

    setFieldValue("itinerary", [newItem], false);
    setFieldValue("en.itinerary", [newItem], false);
  };

  const actionButtons = (
    <div className="d-flex align-items-center pb-4 justify-content-start">
      <button
        type="button"
        onClick={addDayHandler}
        className="btn btn-info me-2"
      >
        Thêm ngày mới
      </button>

      {values.itinerary.length > 0 && (
        <button
          type="button"
          className="btn btn-danger "
          onClick={resetHandler}
        >
          Làm mới
        </button>
      )}
    </div>
  );

  return (
    <div className={styles.container + " pb-5"}>
      {name === "itinerary" && actionButtons}

      <div className={styles.plan + " updateItinerary__accordion pb-4"}>
        {values.itinerary.length > 0 && (
          <Accordion defaultActiveKey={["0"]} alwaysOpen>
            {values.itinerary.map((planItem, index) => (
              <Accordion.Item
                eventKey={planItem.id}
                key={planItem.id}
                className={`itinerary-${index}`}
              >
                <Accordion.Header>
                  <DeleteDayButton
                    onClick={removeHandler}
                    id={planItem.id}
                    disabled={values.itinerary.length === 1}
                  />

                  <div className="row w-100">
                    <div className="col-12 col-lg-6 border-end">
                      <h6>
                        <strong>
                          {planItem.day || (
                            <span className="text-danger">Chưa có tiêu đề</span>
                          )}
                        </strong>
                      </h6>
                      <h5>
                        {planItem.destination || (
                          <span className="text-danger">Chưa có địa điểm</span>
                        )}
                      </h5>
                    </div>

                    <div className="col-12 col-lg-6">
                      <h6>
                        <strong>
                          {values.en.itinerary[index].day || (
                            <span className="text-danger">
                              Chưa có tiêu đề tiếng Anh
                            </span>
                          )}
                        </strong>
                      </h6>
                      <h5>
                        {values.en.itinerary[index].destination || (
                          <span className="text-danger">
                            Chưa có địa điểm tiếng Anh
                          </span>
                        )}
                      </h5>
                    </div>
                  </div>
                </Accordion.Header>

                <Accordion.Body>
                  <div key={planItem.id} className={styles.planItem}>
                    <div className="row">
                      <div className="col-12 col-lg-6">
                        <label>
                          <h6>Tiêu đề</h6>
                          <Field
                            placeholder="Nhập tiêu đề..."
                            className="form-control"
                            name={`itinerary[${index}].day`}
                          />
                        </label>

                        <label>
                          <h6>Địa điểm</h6>

                          <Field
                            placeholder="Nhập địa điểm..."
                            className="form-control"
                            name={`itinerary[${index}].destination`}
                          />
                        </label>
                      </div>

                      <div className="col-12 col-lg-6">
                        <label>
                          <h6>Tiêu đề tiếng Anh</h6>
                          <Field
                            placeholder="Nhập tiêu đề tiếng Anh..."
                            className="form-control"
                            name={`en.itinerary[${index}].day`}
                          />
                        </label>

                        <label>
                          <h6>Địa điểm tiếng Anh</h6>

                          <Field
                            placeholder="Nhập địa điểm tiếng Anh..."
                            className="form-control"
                            name={`en.itinerary[${index}].destination`}
                          />
                        </label>
                      </div>
                    </div>

                    {/* nội dung  */}
                    <div className="row">
                      <div className="col-12 col-lg-6 pb-3">
                        <h6>Nội dung</h6>
                        <div className={styles.editor}>
                          <Editor
                            noImage
                            placeholder="nhập nội dung ở đây..."
                            onChange={(delta) => {
                              setFieldValue(
                                `itinerary[${index}].content`,
                                delta,
                                false
                              );
                            }}
                            initialValue={planItem.content}
                            onBlur={() => {
                              setFieldTouched(
                                `itinerary[${index}].content`,
                                true,
                                true
                              );
                            }}
                          />
                        </div>
                      </div>

                      <div className="col-12 col-lg-6 pb-3">
                        <h6>Nội dung tiếng Anh</h6>
                        <div className={styles.editor}>
                          <Editor
                            noImage
                            placeholder="nhập nội dung ở đây..."
                            onChange={(delta) => {
                              setFieldValue(
                                `en.itinerary[${index}].content`,
                                delta,
                                false
                              );
                            }}
                            initialValue={values.en.itinerary[index].content}
                            onBlur={() => {
                              setFieldTouched(
                                `en.itinerary[${index}].content`,
                                true,
                                true
                              );
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        )}

        {values.itinerary.length === 0 && <h6>Chưa có lộ trình</h6>}
      </div>

      {values.itinerary.length > 0 && name === "itinerary" && actionButtons}
    </div>
  );
}

export default ItineraryForm;
