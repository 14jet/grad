import isEmptyDelta from "../../../services/helpers/quill/isEmptyDelta";
import {
  mediumTextValidator as mt,
  slugValidator,
} from "../../../services/helpers/validator.helper";

export default (values) => {
  const REQUIRED = "Bắt buộc";
  let errors = {};
  let m = [];

  console.log(mt(values.name));

  if (mt(values.name)) {
    m.push({
      field: "Tên visa",
      message: mt(values.name),
    });
  }

  if (mt(values.en.name)) {
    m.push({
      field: "Tên visa (EN)",
      message: mt(values.en.name),
    });
  }

  if (slugValidator(values.slug)) {
    m.push({
      field: "Slug",
      message: slugValidator(values.slug),
    });
  }

  if (!values.country) {
    m.push({
      field: "Nước",
      message: REQUIRED,
    });
  }

  if (Number(values.price) < 0 || Number(values.price) > 1000000000) {
    m.push({
      field: "Giá tiền",
      message: "Giá từ 0 - 1.000.000.000",
    });
  }

  if (isEmptyDelta(values.detail)) {
    m.push({
      field: "Chi tiết phiếu dịch vụ",
      message: REQUIRED,
    });
  }

  if (isEmptyDelta(values.en.detail)) {
    m.push({
      field: "Chi tiết phiếu dịch vụ (EN)",
      message: REQUIRED,
    });
  }

  if (isEmptyDelta(values.price_policies.includes)) {
    m.push({
      field: "Giá bao gồm",
      message: REQUIRED,
    });
  }

  if (isEmptyDelta(values.en.price_policies.includes)) {
    m.push({
      field: "Giá bao gồm (EN)",
      message: REQUIRED,
    });
  }

  if (isEmptyDelta(values.price_policies.excludes)) {
    m.push({
      field: "Giá không bao gồm",
      message: REQUIRED,
    });
  }

  if (isEmptyDelta(values.en.price_policies.excludes)) {
    m.push({
      field: "Giá không bao gồm (EN)",
      message: REQUIRED,
    });
  }

  if (isEmptyDelta(values.terms.cancellation)) {
    m.push({
      field: "Điều kiện hủy đổi",
      message: REQUIRED,
    });
  }

  if (isEmptyDelta(values.en.terms.cancellation)) {
    m.push({
      field: "Điều kiện hủy đổi (EN)",
      message: REQUIRED,
    });
  }

  if (isEmptyDelta(values.terms.notes)) {
    m.push({
      field: "Điều khoản chung",
      message: REQUIRED,
    });
  }

  if (isEmptyDelta(values.en.terms.notes)) {
    m.push({
      field: "Điều khoản chung (EN)",
      message: REQUIRED,
    });
  }

  if (m.length > 0) {
    errors.messages = m;
  }

  return errors;
};
