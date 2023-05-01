const mongoose = require("mongoose");

const FundsandCauseSchema = mongoose.Schema({
  banner: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  upi_id: {
    type: Number,
    required: true,
  },
  fundname: {
    type: String,
    required: true,
  },
  expirydate:{
    type: Date,
    required: true
  },
  status: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
  },
  
});

module.exports = mongoose.model("fundsandcause", FundsandCauseSchema);
