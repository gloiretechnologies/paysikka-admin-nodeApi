const qrcode = require("qrcode");
// const fs = require("fs");
const AWS = require("aws-sdk");
const axios = require("axios");
const CircularJSON = require("circular-json");

const {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_DEFAULT_REGION,
  AWS_BUCKET,
} = process.env;

// exports.Qrcode = async (req, res) => {
//   const data = req.body.code;
//   qrcode.toDataURL(data, function (err, code) {
//     if (err) return console.log("error occurred");
//     let base64String = code;
//     let base64Image = base64String.split(";base64,").pop();
//     let image = fs.writeFile(
//       "image.png",
//       base64Image,
//       { encoding: "base64" },
//       function (err) {
//         console.log("File created");
//       }
//     );
//     console.log(image);
//     return res.status(200).json(image);
//   });
// };

// exports.Qrcode = async (req, res) => {
//   const data = req.body.code;
//   qrcode.toDataURL(data, function (err, code) {
//     if (err) return console.log("error occurred");
//     let base64 = code;
//     // Configure AWS to use promise
//     AWS.config.setPromisesDependency(require("bluebird"));
//     AWS.config.update({
//       accessKeyId: AWS_ACCESS_KEY_ID,
//       secretAccessKey: AWS_SECRET_ACCESS_KEY,
//       region: AWS_DEFAULT_REGION,
//     });

//     const s3 = new AWS.S3();
//     // Ensure that you POST a base64 data to your server.
//     // Let's assume the variable "base64" is one.
//     const base64Data = new Buffer.from(
//       base64.replace(/^data:image\/\w+;base64,/, ""),
//       "base64"
//     );
//     // Getting the file type, ie: jpeg, png or gif
//     const type = base64.split(";")[0].split("/")[1];

//     const userId = 1;

//     const params = {
//       Bucket: AWS_BUCKET,
//       Key: `${userId}.${type}`, // type is not required
//       Body: base64Data,
//       ACL: "public-read",
//       ContentEncoding: "base64", // required
//       ContentType: `image/${type}`, // required. Notice the back ticks
//     };

//     // The upload() is used instead of putObject() as we'd need the location url and assign that to our user profile/database
//     // see: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#upload-property
//     let location = "";
//     let key = "";
//     try {
//       const { Location, Key } = s3.upload(params);
//       location = Location;
//       key = Key;
//     } catch (error) {
//       console.log(error);
//     }

//     // Save the Location (url) to your database and Key if needs be.
//     // As good developers, we should return the url and let other function do the saving to database etc
//     console.log(location, key);

//     return location;
//   });
// };

// exports.Qrcode = async (req, res) => {
//   const data = req.body.code;
//   qrcode.toDataURL(data, function (err, code) {
//     if (err) return console.log("error occurred");
//     let base64 = code;
//     // Configure AWS to use promise
//     AWS.config.update({
//       accessKeyId: AWS_ACCESS_KEY_ID,
//       secretAccessKey: AWS_SECRET_ACCESS_KEY,
//       region: AWS_DEFAULT_REGION,
//     });
//     var s3Bucket = new AWS.S3({ params: { Bucket: AWS_BUCKET } });
//     var buf = Buffer.from(
//       base64.replace(/^data:image\/\w+;base64,/, ""),
//       "base64"
//     );
//     const userId = 1;
//     var data = {
//       Key: userId,
//       Body: buf,
//       ContentEncoding: "base64",
//       ContentType: "image/jpeg",
//     };
//     s3Bucket.putObject(data, function (err, data) {
//       if (err) {
//         console.log(err);
//         console.log("Error uploading data: ", data);
//       } else {
//         console.log("successfully uploaded the image!");
//       }
//     });
//   });
// };

exports.Qrcode = async (req, res) => {
  const result = await axios({
    method: "get",
    url: "http://goldbharat.com/api/getpremium",
  });

  var hx = CircularJSON.stringify(result);
  var jsonfr = JSON.parse(hx);
  return res.status(200).json(jsonfr.data.premium);
};
