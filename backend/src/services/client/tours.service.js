const Tour = require("../../models/tour.model");

module.exports.getTours = async (lang) => {
  let tours = await Tour.fetchAll();
  tours = tours.map((tour) => {
    // các trường phụ thuộc ngôn ngữ
    let name;
    let journey;
    let description;
    let highlights;
    let price_policies;
    let terms;
    let itinerary;
    let departure_dates_text;
    let start_at_text;

    if (lang === "en") {
      name = tour.en.name;
      journey = tour.en.journey;
      description = tour.en.description;
      highlights = tour.en.highlights;
      price_policies = tour.en.price_policies;
      terms = tour.en.terms;
      departure_dates_text = tour.en.departure_dates_text;
      start_at_text = tour.en.start_at_text;
      itinerary = tour.en.itinerary.map((iti, itiIndex) => {
        let images = iti.images.map((image, imageIndex) => ({
          id: image.id,
          isSlider: image.isSlider,
          url: tour.itinerary[itiIndex].images[imageIndex]?.url,
          caption: image.caption,
        }));

        return {
          ...iti,
          images,
        };
      });
    } else {
      name = tour.name;
      journey = tour.journey;
      description = tour.description;
      highlights = tour.highlights;
      price_policies = tour.price_policies;
      terms = tour.terms;
      itinerary = tour.itinerary;
      departure_dates_text = tour.departure_dates_text;
      start_at_text = tour.start_at_text;
    }

    return {
      name,
      journey,
      description,
      highlights,
      price_policies,
      terms,
      itinerary,
      departure_dates_text,
      start_at_text,

      id: tour.id,
      code: tour.code,
      slug: tour.slug,
      destinations: tour.destinations,
      start_at: tour.start_at,
      thumb: tour.thumb,
      banner: tour.banner,
      price: tour.price,
      duration: tour.duration,
      departure_dates: tour.departure_dates.filter(
        (timestamp) => timestamp > Number(Date.now())
      ),
    };
  });

  return tours;
};
