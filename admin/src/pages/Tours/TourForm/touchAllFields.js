export default ({ setFieldTouched, values }) => {
  // set fields touched vietnam version
  setFieldTouched("code", true, true);
  setFieldTouched("name", true, true);
  setFieldTouched("destinations", true, true);
  setFieldTouched("price", true, true);
  setFieldTouched("days", true, true);
  setFieldTouched("nights", true, true);
  setFieldTouched("departureDates", true, true);
  setFieldTouched("startAt", true, true);
  setFieldTouched("description", true, true);
  setFieldTouched("journey", true, true);
  setFieldTouched("banner", true, true);
  setFieldTouched("thumb", true, true);
  setFieldTouched("registrationPolicy", true, true);
  setFieldTouched("cancellationPolicy", true, true);
  setFieldTouched("priceIncludes", true, true);
  setFieldTouched("priceExcludes", true, true);

  // lộ trình
  setFieldTouched("itinerary", true, true);
  values.itinerary.forEach((iti, index) => {
    setFieldTouched(`itinerary[${index}].day`, true, true);
    setFieldTouched(`itinerary[${index}].destination`, true, true);
    setFieldTouched(`itinerary[${index}].content`, true, true);
    iti.images.forEach((_, imgIndex) => {
      setFieldTouched(
        `itinerary[${index}].images[${imgIndex}].caption`,
        true,
        true
      );
    });
  });

  // set fields touched english version
  setFieldTouched("en.name", true, true);
  setFieldTouched("en.journey", true, true);
  setFieldTouched("en.description", true, true);
  setFieldTouched("en.cancellationPolicy", true, true);
  setFieldTouched("en.registrationPolicy", true, true);
  setFieldTouched("en.priceIncludes", true, true);
  setFieldTouched("en.priceExcludes", true, true);
  setFieldTouched("en.startAt", true, true);

  // lộ trình
  setFieldTouched("en.itinerary", true, true);
  values.en.itinerary.forEach((iti, index) => {
    setFieldTouched(`en.itinerary[${index}].day`, true, true);
    setFieldTouched(`en.itinerary[${index}].destination`, true, true);
    setFieldTouched(`en.itinerary[${index}].content`, true, true);
    iti.images.forEach((_, imgIndex) => {
      setFieldTouched(
        `en.itinerary[${index}].images[${imgIndex}].caption`,
        true,
        true
      );
    });
  });
};
