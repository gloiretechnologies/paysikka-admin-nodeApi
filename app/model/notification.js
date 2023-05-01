const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema({

  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  message:{
    type: String,
    required: true,
  }
},
{ timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
