const mongoose = require("mongoose");

const userdeviceSchema = mongoose.Schema({

  devicetoken: {
    type: String,
    required: true,
  },
//   firebaseid: {
//     type: String,
//   },
  userid:{
    type: String,
    required: true,
  }
},
{ timestamps: true }
);

module.exports = mongoose.model("Userdevice", userdeviceSchema);
