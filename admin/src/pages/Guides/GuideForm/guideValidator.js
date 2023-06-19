

const isValidString = value => (typeof value === 'string' && value.length > 0 && value.length <= 500) 
const isValidSlug = value => typeof value === 'string' && /^[a-z0-9-]{1,500}$/.test(value);
const isValidDelta = delta => delta && delta.ops && !(delta.ops.length === 1 &&  !Boolean(delta.ops[0].insert.trim()))


const ERROR_STRING = '1 - 500 ký tự.'
const ERROR_SLUG = '1 - 500 ký tự không dấu, gồm a - z, 0 - 9, dấu gạch ngang "-".'
const ERROR_DELTA = 'Bắt buộc.'

export default (v) => {
  const errors = {};
  let m = [];
  const REQUIRED = "Bắt buộc";

  // title
  if (!isValidString(v.title)) {
    m.push({
      field: "Tiêu đề",
      message: ERROR_STRING,
    });
  }

  if (!isValidString(v.en.title)) {
    m.push({
      field: "Tiêu đề (EN)",
      message: ERROR_STRING,
    });
  }

  // slug
  if (!isValidSlug(v.slug)) {
    m.push({
      field: "Slug",
      message: ERROR_SLUG,
    });
  }

  if (!isValidString(v.author)) {
    m.push({
      field: "Tác giả",
      message: ERROR_STRING,
    });
  }

  if (!v.category) {
    m.push({
      field: "Danh mục",
      message: REQUIRED,
    });
  }

  if (!isValidDelta(v.content)) {
    m.push({
      field: "Nội dung",
      message: REQUIRED,
    });
  }

  if (!isValidDelta(v.en.content)) {
    m.push({
      field: "Nội dung (EN)",
      message: ERROR_DELTA,
    });
  }

  if (!v.thumb) {
    m.push({
      field: "Hình thumbnail",
      message: ERROR_DELTA,
    });
  }

  if (m.length > 0) {
    errors.messages = m;
  }

  return errors;
};
