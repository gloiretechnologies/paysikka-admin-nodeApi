const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: false,
    min: 6,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    min: 10,
    max: 255,
  },
  userid: {
    type: Number,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  existance: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: Number,
    required: true,
    min: 10,
    // max: 11
  },
  customerid: {
    type: Number,
    required: false,
  },
  gs_token: {
    type: String,
    required: false,
  },
  kycstatus: {
    type: Boolean,
    default: false,
  },
  aadharno: {
    type: Number,
    default: 0,
  },
  panno: {
    type: String,
    dafault: "0",
  },
  state: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Users", UserSchema);
