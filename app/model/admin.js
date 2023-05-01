const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

const schema = new mongoose.Schema(
  {
    admin_id: Number,
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
      integer: true,
    },
  },
  { timestamps: true }
);

schema.plugin(autoIncrement, { inc_field: "admin_id" });
const admin = mongoose.model("admin_users", schema);

module.exports = admin;
