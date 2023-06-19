module.exports.getDestinations = async (lang) => {
  const Destination = require("../../models/destination.model");
  let destinations = await Destination.getAll();

  if (lang === "en") {
    destinations.types = destinations.types.map((item) => {
      const { en, ...rest } = item;
      return { ...rest, name: en.name };
    });

    destinations.continents = destinations.continents.map((item) => {
      const { en, ...rest } = item;
      return { ...rest, name: en.name };
    });

    destinations.regions = destinations.regions.map((item) => {
      const { en, ...rest } = item;
      return { ...rest, name: en.name };
    });

    destinations.places = destinations.places.map((item) => {
      const { en, ...rest } = item;
      return { ...rest, name: en.name };
    });
  }

  if (lang === "vi") {
    destinations.types = destinations.types.map((item) => {
      const { en, ...rest } = item;
      return rest;
    });

    destinations.continents = destinations.continents.map((item) => {
      const { en, ...rest } = item;
      return rest;
    });

    destinations.regions = destinations.regions.map((item) => {
      const { en, ...rest } = item;
      return rest;
    });

    destinations.places = destinations.places.map((item) => {
      const { en, ...rest } = item;
      return rest;
    });
  }

  return destinations;
};
