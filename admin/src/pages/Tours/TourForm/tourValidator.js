

const isValidString = value => (typeof value === 'string' && value.length > 0 && value.length <= 500) 
const isValidSlug = value => typeof value === 'string' && /^[a-z0-9-]{1,500}$/.test(value);
const isValidCode = value => typeof value === 'string' && /^[a-z0-9]{1,10}$/.test(value);
const isValidDelta = delta => delta && delta.ops && !(delta.ops.length === 1 &&  !Boolean(delta.ops[0].insert.trim()))
const isValidDepartureDates = value => value.length > 0
const isValidDaysAndNighs = values => {
  const days = Number(values.days);
  const nights = Number(values.nights);
  return Math.abs(days - nights) <= 1
} 
const isValidPrice = value => {
  const price = Number(value);
  return !isNaN(price) && Number.isInteger(price) && price >= 0 && price <= 1000 * 1000 * 1000;
}
const isValidDestinations = value => value.length > 0;
const getItineraryErrors = (value, language) => {
  const ERROR_REQUIRED = 'Bắt buộc';
  let m = []
  const pushError = (field, message) => {
    m.push({field, message})
  }

  if (value.length === 0) pushError(`Lộ trình ${language}`, ERROR_REQUIRED);

  value.forEach((iti, index) => {
    const prefix = `Lộ trình ${language}, item thứ ${index + 1}`
    if (!isValidString(iti.day)) pushError(`${prefix}: tiêu đề}`, ERROR_STRING);
    if (!isValidString(iti.destination)) pushError(`${prefix}: điểm đến}`, ERROR_STRING);
    if (!isValidDelta(iti.content)) pushError(`${prefix}: nội dung}`, ERROR_DELTA);
    console.log(m)
    iti.images.forEach((imageItem, imageIndex) => {
      if (!isValidString(imageItem.caption)) pushError(`${prefix}, hình thứ ${imageIndex + 1}: mô tả hình ảnh`, ERROR_STRING);
    })
  })

  if (language && value.every(item => item.images.length == 0)) {
    pushError("Lộ trình", "Chưa có hình lộ trình")
  }

  console.log(value)
  return m;
}

const ERROR_STRING = '1 - 500 ký tự.'
const ERROR_SLUG = '1 - 500 ký tự không dấu, gồm a - z, 0 - 9, dấu gạch ngang "-".'
const ERROR_CODE = '1 - 10 ký tự không dấu, gồm a - z, 0 - 9.'
const ERROR_DELTA = 'Bắt buộc.'
const ERROR_DEPARTUREDATES = 'Bắt buộc.'
const ERROR_DAYS_NIGHTS = 'Số ngày đêm không chênh lệch quá 1.'
const ERROR_PRICE = 'Giá phải là số nguyên 0 - 1000.000.000'
const ERROR_DESTINATIONS = 'Bắt buộc.'

const tourValidator = (v) => {
  const REQUIRED = "Bắt buộc";
  const errors = {};

  let m = [];

  // code
  if (!isValidCode(v.code)) {
    m.push({
      field: "Mã tour",
      message: ERROR_CODE 
    });
  }

  // name
  if (!isValidString(v.name)) {
    m.push({
      field: "Tên tour",
      message: ERROR_STRING,
    });
  }

  if (!isValidString(v.en.name)) {
    m.push({
      field: "Tên tour (EN)",
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

  // journey
  if (!isValidString(v.journey)) {
    m.push({
      field: "Hành trình",
      message: ERROR_STRING,
    });
  }

  if (!isValidString(v.en.journey)) {
    m.push({
      field: "Hành trình (EN)",
      message: ERROR_STRING,
    });
  }

  // description
  if (!isValidDelta(v.description)) {
    m.push({
      field: "Mô tả",
      message: ERROR_DELTA,
    });
  }

  if (!isValidDelta(v.en.description)) {
    m.push({
      field: "Mô tả (EN)",
      message: ERROR_DELTA,
    });
  }

  // departure dates
  if (!isValidDepartureDates(v.departureDates)) {
    m.push({
      field: "Ngày khởi hành",
      message: ERROR_DEPARTUREDATES
    });
  }

  // duration
  if (!isValidDaysAndNighs({days: v.days, nights: v.nights})) {
    m.push({
      field: "Số ngày, đêm",
      message: ERROR_DAYS_NIGHTS,
    });
  }

  // price
  if (!isValidPrice(v.price)) {
    m.push({
      field: "Giá tour",
      message: ERROR_PRICE,
    });
  }

  // destinations
  if (!isValidDestinations(v.destinations)) {
    m.push({
      field: "Điểm đến",
      message: ERROR_DESTINATIONS,
    });
  }

  // start at
  if (!isValidString(v.startAt)) {
    m.push({
      field: " điểm khởi hành",
      message: ERROR_STRING,
    });
  }

  // thumbnail 
  if (!v.thumb) {
    m.push({
      field: "Hình thumbnail",
      message: REQUIRED,
    });
  }


  // terms
  if (!isValidDelta(v.registrationPolicy)) {
    m.push({
      field: "Điều kiện đăng ký",
      message: ERROR_DELTA,
    });
  }

  if (!isValidDelta(v.cancellationPolicy)) {
    m.push({
      field: "Điều kiện hủy đổi",
      message: ERROR_DELTA,
    });
  }

  if (!isValidDelta(v.en.registrationPolicy)) {
    m.push({
      field: "Điều kiện đăng ký (EN)",
      message: ERROR_DELTA,
    });
  }

  if (!isValidDelta(v.en.cancellationPolicy)) {
    m.push({
      field: "Điều kiện hủy đổi (EN)",
      message: ERROR_DELTA,
    });
  }

  // price policies
  if (!isValidDelta(v.priceIncludes)) {
    m.push({
      field: "Giá bao gồm",
      message: ERROR_DELTA,
    });
  }

  if (!isValidDelta(v.en.priceIncludes)) {
    m.push({
      field: "Giá bao gồm (EN)",
      message: ERROR_DELTA,
    });
  }

  if (!isValidDelta(v.priceExcludes)) {
    m.push({
      field: "Giá không bao gồm",
      message: ERROR_DELTA,
    });
  }

  if (!isValidDelta(v.en.priceExcludes)) {
    m.push({
      field: "Giá không bao gồm (EN)",
      message: ERROR_DELTA,
    });
  }

  // itinerary
  const itineraryErrors = getItineraryErrors(v.itinerary, '');
  const itineraryErrorsEN = getItineraryErrors(v.en.itinerary, 'EN');
  m = [...m, ...itineraryErrors, ...itineraryErrorsEN]


  if (m.length > 0) {
    errors.messages = m;
  }

  return errors;
};

export default tourValidator;
