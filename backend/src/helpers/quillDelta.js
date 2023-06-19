const { object, array, test } = require("yup");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports.mongooseDeltaSchema = new Schema({
  ops: {
    type: Array,
    required: true,
  },
});

module.exports.DELTA = { ops: [{ insert: "\n" }] };

module.exports.isEmptyDelta = (delta) => {
  const ops = delta.ops;
  return ops.length === 1 && !Boolean(ops[0].insert.trim());
};

module.exports.yupDeltaSchema = object({
  ops: array().required(),
});

module.exports.yupCheckEmptyDelta = (message) => {
  const isEmptyDelta = (delta) => {
    const ops = delta.ops;
    return ops.length === 1 && !Boolean(ops[0].insert.trim());
  };

  return {
    name: "is-empty-delta",
    skipAbsent: true,
    test(value, ctx) {
      if (isEmptyDelta(value)) {
        return ctx.createError({ message: message });
      }
      return true;
    },
  };
};
