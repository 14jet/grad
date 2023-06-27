import isEmptyDelta from "../../../services/helpers/quill/isEmptyDelta";
const isValidSlug = value => typeof value === 'string' && /^[a-z0-9-]{1,500}$/.test(value);
const isValidPrice = value => {
  const price = Number(value);
  return !isNaN(price) && Number.isInteger(price) && price >= 0 && price <= 1000 * 1000 * 1000;
}
const isValidString = value => (typeof value === 'string' && value.length > 0 && value.length <= 500) 

const ERROR_SLUG = '1 - 500 ký tự không dấu, gồm a - z, 0 - 9, dấu gạch ngang "-".'
const ERROR_STRING = '1 - 500 ký tự.'

export default (values) => {
  const REQUIRED = "Bắt buộc";
  let errors = {};
  let m = [];


  if (!isValidString(values.name)) {
    m.push({
      field: "Tên visa",
      message: ERROR_STRING,
    });
  }

  if (!isValidString(values.en.name)) {
    m.push({
      field: "Tên visa (EN)",
      message: ERROR_STRING,
    });
  }

  if (!isValidSlug(values.slug)) {
    m.push({
      field: "Slug",
      message: ERROR_SLUG,
    });
  }

  if (!values.country) {
    m.push({
      field: "Nước",
      message: REQUIRED,
    });
  }

  if (!isValidPrice(values.price)) {
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

  if (isEmptyDelta(values.priceIncludes)) {
    m.push({
      field: "Giá bao gồm",
      message: REQUIRED,
    });
  }

  if (isEmptyDelta(values.en.priceIncludes)) {
    m.push({
      field: "Giá bao gồm (EN)",
      message: REQUIRED,
    });
  }

  if (isEmptyDelta(values.priceExcludes)) {
    m.push({
      field: "Giá không bao gồm",
      message: REQUIRED,
    });
  }

  if (isEmptyDelta(values.en.priceExcludes)) {
    m.push({
      field: "Giá không bao gồm (EN)",
      message: REQUIRED,
    });
  }

  if (isEmptyDelta(values.cancellationPolicy)) {
    m.push({
      field: "Điều kiện hủy đổi",
      message: REQUIRED,
    });
  }

  if (isEmptyDelta(values.en.cancellationPolicy)) {
    m.push({
      field: "Điều kiện hủy đổi (EN)",
      message: REQUIRED,
    });
  }

  if (isEmptyDelta(values.term)) {
    m.push({
      field: "Điều khoản chung",
      message: REQUIRED,
    });
  }

  if (isEmptyDelta(values.en.term)) {
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
