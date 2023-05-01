const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);


const PromotionPackageSchema = mongoose.Schema({
  promotionid: {
    type: Number,
    required: true,
  },
  packageid: {
    type: Number,
    // required: true,
  },
  validity: {
    type: String,
    required: true,
  },
  cost:{
    type: Number,
    required: true
  },
  status: {
    type: Number,
    default: 1
  },
  include1: {
    type: Number,
    required: true
  },
  include2: {
    type: Number,
    required: true
  },
  include3: {
    type: Number,
    required: true
  } 
},
{ timestamps: true }
);
PromotionPackageSchema.plugin(autoIncrement, { inc_field: "packageid" });

module.exports = mongoose.model("promotionpackages", PromotionPackageSchema);
