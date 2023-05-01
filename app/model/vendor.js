const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

const schema = new mongoose.Schema(
  {
    vendorid: Number,
    vendorname: {
      type: String,
      required: true,
    },
    mobilenumber: {
      type: Number,
      required: true
    },
    vendorimage: {
      type: String,
      // required: true   
 },
    availability: [{
      weekends: String,
      weekdays: String  
  }],
    timings: {
      type: String,
      required: true
    },
    vendoritems: [{
      itemname: String,
      itemcost: Number,
      itemimage: String,
      details: String
    }]
     },
  { timestamps: true }
);

schema.plugin(autoIncrement, { inc_field: "vendorid" });
const vendor = mongoose.model("vendor", schema);

module.exports = vendor;
