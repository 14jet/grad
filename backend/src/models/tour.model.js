const { mongooseDeltaSchema } = require("../helpers/quillDelta");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stringType = {
  type: String,
  required: true,
  trim: true,
  maxlength: 500,
};

const slugType = {
  ...stringType,
  validate: {
    validator: (value) => /^[a-z0-9-]{1,500}$/.test(value),
    message: "Slug chỉ được chứa a - z không dấu, 0 - 9, 1 - 500 ký tự.",
  },
};

const schema = new Schema(
  {
    code: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: (value) => /^[a-z0-9]{1,10}$/.test(value),
        message: "Mã tour chỉ được chứa 1 - 10 ký tự, chỉ chứa a - z, 0 - 9.",
      },
    },
    thumb: stringType,
    name: stringType,
    journey: stringType,
    slug: slugType,
    destinations: [
      {
        type: Schema.Types.ObjectId,
        ref: "Place",
      },
    ],
    startAt: stringType,

    deleted: {
      type: Boolean,
      default: false,
    },

    // integer 0 - 1.000.000.000
    price: {
      type: Number,
      min: 0,
      max: 1000 * 1000 * 1000,
      validate: {
        validator: Number.isInteger,
        message: "{VALUE} is not an integer value",
      },
    },

    // integer 1 - 30
    days: {
      type: Number,
      min: 1,
      max: 30,
      validate: {
        validator: Number.isInteger,
        message: "{VALUE} is not an integer value",
      },
    },

    // integer 0 - 30
    nights: {
      type: Number,
      min: 0,
      max: 30,
      validate: {
        validator: Number.isInteger,
        message: "{VALUE} is not an integer value",
      },
    },

    // not empty array
    departureDates: {
      type: [Date],
      required: true,
      validate: {
        validator: (value) => value.length > 0,
        message: "Departure dates must not be empty",
      },
    },

    departure_dates: Array,

    // not empty array
    itinerary: [
      {
        id: stringType,
        day: stringType,
        destination: stringType,
        images: [
          {
            id: stringType,
            url: {
              type: String,
              default: "",
            },
            caption: stringType,
          },
        ],
        content: mongooseDeltaSchema,
      },
    ],

    description: mongooseDeltaSchema,
    priceIncludes: mongooseDeltaSchema,
    priceExcludes: mongooseDeltaSchema,
    registrationPolicy: mongooseDeltaSchema,
    cancellationPolicy: mongooseDeltaSchema,

    en: {
      type: Object,
      required: true,
      name: stringType,
      journey: stringType,
      startAt: stringType,

      description: mongooseDeltaSchema,
      priceIncludes: mongooseDeltaSchema,
      priceExcludes: mongooseDeltaSchema,
      registrationPolicy: mongooseDeltaSchema,
      cancellationPolicy: mongooseDeltaSchema,

      itinerary: [
        {
          type: Object,
          required: true,
          day: stringType,
          destination: stringType,
          content: mongooseDeltaSchema,
          images: [
            {
              id: stringType,
              caption: stringType,
            },
          ],
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Tour", schema);
