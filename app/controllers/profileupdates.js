const users = require("../model/user");
const merchant = require("../model/merchant");
const { S3Client } = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3 = new S3Client({
  region: process.env.AWS_DEFAULT_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_DEFAULT_REGION,
  },
  sslEnabled: false,
  s3ForcePathStyle: true,
  signatureVersion: "v4",
});

const upload = () =>
  multer({
    storage: multerS3({
      s3: s3,
      ACL: "public-read",
      bucket: process.env.AWS_BUCKET,
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, new Date().toISOString() + "-" + file.originalname);
      },
    }),
  });

// update of merchant profile

exports.profileupdatemerchant = (req, res) => {
  try {
    // updating the user
    const uploadSingle = upload().single("merchantimage");
    uploadSingle(req, res, async (err) => {
      // console.log(req.body, req.file);
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }
      // validations
      if (req.file) {
        image = req.file.location;
      } else {
        image = req.body.merchantimage;
      }
      if (!image) return res.status(400).send({ message: "please send Image" });
      if (!req.body.merchantname)
        return res.status(400).send({ message: "please enter name" });
      if (!req.body.merchantid)
        return res.status(400).send({ message: "please send merchant id" });
      if (!req.body.merchantnumber)
        return res.status(400).send({ message: "please enter phone number" });
      if (!req.body.merchantemail)
        return res.status(400).send({ message: "please enter email" });
      if (!req.body.businessname)
        return res.status(400).send({ message: "please enter businessname" });
      if (!req.body.merchantpan)
        return res.status(400).send({ message: "please enter pan" });
      if (!req.body.merchantaadhar)
        return res.status(400).send({ message: "please enter aadhar" });
      if (!req.body.merchantwhatsappnumber)
        return res
          .status(400)
          .send({ message: "please enter whatsapp number" });
      if (!req.body.gstnumber)
        return res.status(400).send({ message: "please enter gst number" });
      if (!req.body.pincode)
        return res.status(400).send({ message: "please enter pincode" });
      if (!req.body.address)
        return res.status(400).send({ message: "please enter address" });

      const user = await merchant.updateOne(
        { merchantid: req.body.merchantid },
        {
          $set: {
            merchantname: req.body.merchantname,
            merchantemail: req.body.merchantemail,
            merchantnumber: req.body.merchantnumber,
            businessname: req.body.businessname,
            merchantpan: req.body.merchantpan,
            merchantaadhar: req.body.merchantaadhar,
            merchantimage: image,
            merchantwhatsappnumber: req.body.merchantwhatsappnumber,
            gstnumber: req.body.gstnumber,
            pincode: req.body.pincode,
            address: req.body.address,
          },
        }
      );
      console.log("result", res.status);
      if (res.status === 400) {
        res.statusCode = res.status;
      }
      res.status(200).json(user);
    });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

// update of user profile

exports.profileupdateuser = async (req, res) => {
  try {
    if (!req.body.name)
      return res.status(400).send({ message: "please enter name" });
    if (!req.body.email)
      return res.status(400).send({ message: "please enter email" });
    if (!req.body.userid)
      return res.status(400).send({ message: "please send userid" });
    if (!req.body.aadharno)
      return res.status(400).send({ message: "please enter aadhar no" });
    if (!req.body.panno)
      return res.status(400).send({ message: "please enter pan no" });
    const user = await users.updateOne(
      { userid: req.body.userid },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          aadharno: req.body.aadharno,
          businessname: req.body.businessname,
          panno: req.body.panno,
        },
      }
    );
    console.log("result", res.status);
    if (res.status === 400) {
      res.statusCode = res.status;
    }
    res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

// get merchant profile

exports.merchantprofile = async (req, res) => {
  try {
    const profile = await merchant.findOne({ merchantid: req.params.id });
    if (profile) {
      return res.status(200).json(profile);
    } else {
      return res.status(400).json({ mes: "Not an User" });
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

// get user profile

exports.userprofile = async (req, res) => {
  try {
    const profile = await users.findOne({ userid: req.params.id });
    if (profile) {
      return res.status(200).json(profile);
    } else {
      return res.status(400).json({ mes: "Not an User" });
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};
