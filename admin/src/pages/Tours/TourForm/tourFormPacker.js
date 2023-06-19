import { slugify } from "../../../services/helpers/string.helper";

export default (values) => {
  const formData = new FormData();
  if (values.id) {
    formData.append("id", values.id);
  }
  const tour = {
    code: values.code.trim(),
    name: values.name.trim(),
    slug: values.slug.trim(),
    journey: values.journey.trim(),
    description: values.description,
    price: values.price,
    destinations: values.destinations,
    departureDates: values.departureDates,
    startAt: values.startAt,
    days: values.days,
    nights: values.nights,
    priceIncludes: values.priceIncludes,
    priceExcludes: values.priceExcludes,
    registrationPolicy: values.registrationPolicy,
    cancellationPolicy: values.cancellationPolicy,
    en: values.en,
  };

  if (values._id) {
    tour._id = values._id;
  }

  const itinerary = values.itinerary.map((item) => ({
    id: item.id,
    day: item.day,
    destination: item.destination,
    content: item.content,
    images: item.images.map((imgItem) => ({
      ...imgItem,
      url: typeof imgItem.url === "string" ? imgItem.url : "",
    })),
  }));

  tour.itinerary = itinerary;
  tour.en.itinerary = values.en.itinerary;
  if (typeof values.thumb === "string") {
    tour.thumb = values.thumb;
  } else {
    formData.append("thumb", values.thumb);
  }

  if (typeof values.banner === "string") {
    tour.banner = values.banner;
  } else {
    formData.append("banner", values.banner);
  }

  // itinerary images
  const FILE_NAME_DIVIDER = "namedivider";

  values.itinerary.forEach((iti, itiIndex) => {
    iti.images.forEach((imgItem, imgIndex) => {
      if (typeof imgItem.url !== "string") {
        const file = imgItem.url;
        const originalName = file.name;
        const ext = originalName.slice(originalName.lastIndexOf("."));
        const fileName = slugify(imgItem.caption) + ext;

        formData.append(
          "images",
          file,
          `${itiIndex}${FILE_NAME_DIVIDER}${imgIndex}${FILE_NAME_DIVIDER}${fileName}`
        );
      }
    });
  });

  formData.append("tour", JSON.stringify(tour));

  return formData;
};
