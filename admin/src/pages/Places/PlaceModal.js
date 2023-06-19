// main
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";

// components
import CustomModal, { FormGroup } from "../../components/CustomModal";

// other
import {
  addPlace,
  updatePlace,
  resetPlacesState,
} from "../../store/place.slice";
import styles from "./AddNewDestination.module.css";
import {
  mediumTextValidator as mt,
  slugValidator,
} from "../../services/helpers/validator.helper";

function PlaceModal({ destinations, initialValues, mode, ...props }) {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.places);

  const submitHandler = (values) => {
    const formData = new FormData();
  
    const place = {
      _id: values._id,
      continent: values.type === 'province' ? 'chau-a' : values.continent,
      region: values.region,
      name: values.name,
      slug: values.slug,
      en: values.en,
      image: typeof values.image !== 'string' ? '': values.image,
      type: values.type,
    }

    formData.append("place", JSON.stringify(place))
    if (typeof values.image !== 'string') {
      const ext = values.image.name.slice(values.image.name.lastIndexOf("."))
      formData.append('image', values.image , values.slug + ext)
    }

    if (mode === "edit") {
      dispatch(updatePlace(formData));
    }

    if (mode === "add") {
      dispatch(addPlace(formData));
    }
  };

  const validator = (v) => {
    const errors = {};
    if (!v.type) {
      errors.type = "Bắt buộc";
    }

    if (!v.continent && v.type === "country") {
      errors.continent = "Bắt buộc";
    }

    if (!v.region && v.type === "province") {
      errors.region = "Bắt buộc";
    }

    if (mt(v.name)) {
      errors.name = mt(v.name);
    }

    if (slugValidator(v.slug)) {
      errors.slug = slugValidator(v.slug);
    }

    if (mt(v.en.name)) {
      errors.en = {
        name: mt(v.en.name),
      };
    }

    return errors;
  };

  let actionName = "";

  if (mode === "add") {
    actionName = "addPlace";
  }

  if (mode === "edit") {
    actionName = "updatePlace";
  }

  const isSuccess = status[actionName] === "succeeded";
  const submitRef = useRef();

  useEffect(() => {
    if (isSuccess) {
      props.onHide();
    }
  }, [isSuccess]);

  return (
    <CustomModal
      title={
        mode === "add"
          ? "Thêm địa điểm"
          : mode === "edit"
          ? "Cập nhật địa điểm"
          : ""
      }
      submitRef={submitRef}
      isLoading={status[actionName] === "pending"}
      error={error[actionName]}
      submitButtonText={
        mode === "add" ? "Thêm" : mode === "edit" ? "Cập nhật" : ""
      }
      success={{
        isSuccess: status[actionName] === "succeeded",
        message:
          mode === "add"
            ? "Thêm địa điểm thành công"
            : mode === "edit"
            ? "Cập nhật địa điểm thành công"
            : "",
        cb: () => {
          dispatch(resetPlacesState(actionName));
          props.onHide();
        },
      }}
      onHide={() => {
        dispatch(resetPlacesState(actionName));
        props.onHide();
      }}
      {...props}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={submitHandler}
        validate={validator}
        enableReinitialize
      >
        {({ values, setFieldValue }) => (
          <Form>
            <FormGroup isRequired label="Loại" name="type" as="select">
              <option value="">Chọn loại</option>
              {["province", "country"].map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </FormGroup>

            {values.type === "country" && (
              <FormGroup
                isRequired
                label="Châu lục"
                name="continent"
                as="select"
              >
                <option value="">Chọn châu lục</option>
                {[
                  "chau-a",
                  "chau-au",
                  "chau-phi",
                  "chau-my",
                  "chau-dai-duong",
                ].map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </FormGroup>
            )}

            {(values.type === "province" || values.type === "city") && (
              <FormGroup isRequired label="Vùng miền" name="region" as="select">
                <option value="">Chọn vùng miền</option>
                {[
                  "mien-bac",
                  "bac-trung-bo",
                  "nam-trung-bo",
                  "tay-nguyen",
                  "dong-nam-bo",
                  "mien-tay",
                ].map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </FormGroup>
            )}

            <FormGroup isRequired label="Tên địa điểm" name="name" />
            <FormGroup isRequired label="Slug" name="slug" />
            <FormGroup
              isRequired
              label="Tên địa điểm tiếng Anh"
              name="en.name"
            />

            <div className="w-100">
              <h6>Hình ảnh</h6>
              <label
                className={styles.imageLabel}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files[0];
                  if (file) {
                    setFieldValue("image", file);
                  }
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                }}
              >
                {!values.image && <span>+</span>}
                <input
                  type="file"
                  hidden
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      setFieldValue("image", e.target.files[0]);
                    }
                  }}
                />
                {values.image && (
                  <img
                    src={
                      typeof values.image === "string"
                        ? values.image
                        : URL.createObjectURL(values.image)
                    }
                  />
                )}
              </label>
            </div>

            <button type="submit" hidden ref={submitRef}>
              Lưu
            </button>
          </Form>
        )}
      </Formik>
    </CustomModal>
  );
}

export default PlaceModal;
