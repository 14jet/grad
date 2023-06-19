import React, { useEffect, useRef } from "react";
import { Form, Formik } from "formik";
import CustomModal, { FormGroup } from "../../../components/CustomModal";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  resetGuidesState,
  updateCategory,
} from "../../../store/guides.slice";
import {
  mediumTextValidator as mt,
  slugValidator,
} from "../../../services/helpers/validator.helper";

function GuidesCategoryModal({
  mode,
  item,
  onHide,
  reFetchCategories,
  ...props
}) {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.guides);

  let initialValues = item || {
    name: "",
    slug: "",
    en: { name: "" },
  };

  const submitHandler = (values) => {
    if (mode === "add") {
      dispatch(addCategory(values));
    } else {
      dispatch(updateCategory(values));
    }
  };

  const validator = (values) => {
    const errors = {};

    if (mt(values.name)) {
      errors.name = mt(values.name);
    }

    if (slugValidator(values.slug)) {
      errors.slug = slugValidator(values.slug);
    }

    if (mt(values.en.name)) {
      errors.en = {
        name: mt(values.en.name),
      };
    }

    return errors;
  };

  const actionName = mode === "add" ? "addCategory" : "updateCategory";
  const isSuccess = status[actionName] === "succeeded";

  const submitRef = useRef();

  useEffect(() => {
    if (isSuccess) {
      onHide();
    }
  }, [isSuccess]);
  return (
    <CustomModal
      title={mode === "add" ? "Thêm danh mục" : "Cập nhật danh mục"}
      submitRef={submitRef}
      isLoading={status[actionName] === "pending"}
      error={error[actionName]}
      submitButtonText={mode === "add" ? "Add" : "Update"}
      success={{
        isSuccess: isSuccess,
        message:
          mode === "add"
            ? "Thêm danh mục thành công"
            : "Cập nhật danh mục thành công",
        cb: () => {
          onHide();
          dispatch(resetGuidesState("addCategory"));
          dispatch(resetGuidesState("updateCategory"));
        },
      }}
      onHide={() => {
        onHide();
        dispatch(resetGuidesState("addCategory"));
        dispatch(resetGuidesState("updateCategory"));
      }}
      {...props}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={submitHandler}
        validate={validator}
        enableReinitialize
      >
        <Form>
          <FormGroup isRequired label="Tên danh mục" name="name" />
          <FormGroup isRequired label="Slug" name="slug" />
          <FormGroup isRequired label="Tên danh mục tiếng Anh" name="en.name" />
          <button type="submit" hidden ref={submitRef}>
            Lưu
          </button>
        </Form>
      </Formik>
    </CustomModal>
  );
}

export default GuidesCategoryModal;
