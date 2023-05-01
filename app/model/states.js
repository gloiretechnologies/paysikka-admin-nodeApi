const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

const schema = new mongoose.Schema(
  {
    stateid: Number,
    statename: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  { timestamps: true }
);

schema.plugin(autoIncrement, { inc_field: "stateid" });

const states = mongoose.model("states", schema);

module.exports = states;
