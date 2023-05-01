const express = require('express')
const bodyparser = require ('body-parser')
const app = express()
app.use(bodyparser.json())
const admin = require("firebase-admin");
const service_account = require("../../privatefile.json");


admin.initializeApp({
  credential: admin.credential.cert(service_account),
 //   databaseURL: "https://sample-project-e1a84.firebaseio.com"
});

exports.sendnotification = async(req, res) => {

const SERVER_KEY = "AAAA9ZVNfrw:APA91bEFp_hR5ZNcXLIkuLBF8rQi9OISUxEd5H549MWQv0VmV4zIxtae2pDCn7LTVjy-Mi9-YtnhJlHTTMzoXA2-1oXaec-87DnsOjgQGnqclwFlwd4ah7K2S9FhAIvxTQZs_y_uDtQn"

const registrationToken = "cRLBDmWKj2M:APA91bHBpn8fbEjW_ylJboUzEt0OL73yJj8gyauE4Vu_MqALQXiPQXAK0Anv2DsxUVYlXfQPBm4MnlkAPdLfjVpwW4EYj0nGRGWB3UAxT1R_Nkd1MnyoxipPyWu5cBvgopE3ogpBM9r7"

const payload = {
    data: {
      title: "notification",
      body: "Hii",
    }
}
const options = {
  priority: "high",
  timeToLive: 60 * 60 * 24,
  
}
const option = {
  headers: {
    "Authorization": SERVER_KEY,
    
  },
}
admin.messaging().sendToDevice(registrationToken, payload, options, option)
.then( response => {

 res.status(200).send("Notification sent successfully")
 
})
.catch( error => {
    console.log(error);
});
}










