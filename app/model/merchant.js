const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

const schema = new mongoose.Schema(
  {
    merchant_id: Number,
    merchantname: {
      type: String,
      required: true,
    },
    merchantemail: {
      type: String,
      required: true,
    },
    merchantnumber: {
      type: Number,
      required: true,
      integer: true,
    },
    merchantlogo: {
      type: String,
    },
    businessname: {
      type: String,
      required: true,
    },
    merchantpan: {
      type: String,
      required: true,
    },
    merchantaadhar: {
      type: String,
      required: true,
    },
    merchantimage: {
      type: String,
    },
    merchantwhatsappnumber: {
      type: Number,
      required: true,
      integer: true,
    },
    gstnumber: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    upiid: {
      type: String,
    },
    state: {
      type: String,
      required: true

    },
    status: {
      type: Number,
      default: 1,
      integer: true,
    },
    
  },
  { timestamps: true }
);

schema.plugin(autoIncrement, { inc_field: "merchant_id" });
const merchant = mongoose.model("merchant_users", schema);

module.exports = merchant;
