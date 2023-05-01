const merchant = require("../model/merchant");
const jwt = require("jsonwebtoken");
const request = require("request");

exports.register = async (req, res) => {
  try {
    //validations
    if (!req.body.merchantname)
      return res.status(400).send({ message: "please enter name" });
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
      return res.status(400).send({ message: "please enter whatsapp number" });
    if (!req.body.gstnumber)
      return res.status(400).send({ message: "please enter gst number" });
    if (!req.body.pincode)
      return res.status(400).send({ message: "please enter pincode" });
    if (!req.body.address)
      return res.status(400).send({ message: "please enter address" });
    // check if user already exist
    const merchantemail = req.body.merchantemail;
    const oldUser = await merchant.findOne({ merchantemail });
    if (oldUser) {
      return res.status(400).json({ mes: "User Already Exist. Please Login" });
    }
    // Validate if user exist in our database
    const merchantnumber = req.body.merchantnumber;
    const number = await merchant.findOne({ merchantnumber });
    if (number) {
      return res.status(400).json({ mes: "User Already Exist. Please Login" });
    } else {
      // calling cyrus api to register merchant
      var options = {
        method: "POST",
        url: "https://cyrusrecharge.in/api/upiapi.aspx",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        form: {
          MerchantID: process.env.MERCHANTID,
          MerchantKey: process.env.MERCHANT_KEY,
          MethodName: "REGISTRATION",
          Mobile: req.body.merchantnumber,
          Email: req.body.merchantemail,
          Company: req.body.businessname,
          Name: req.body.merchantname,
          Pan: req.body.merchantpan,
          Pincode: req.body.pincode,
          Address: req.body.address,
          Aadhar: req.body.merchantaadhar,
          OTP: "123456",
        },
      };
      request(options, function (error, response) {
        if (error) throw new Error(error);
        var jsonFormat = JSON.parse(response.body);
        return res.status(200).json(jsonFormat);
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.registrationverifyotp = async (req, res) => {
  try {
    if (!req.body.merchantname)
      return res.status(400).send({ message: "please enter name" });
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
      return res.status(400).send({ message: "please enter whatsapp number" });
    if (!req.body.gstnumber)
      return res.status(400).send({ message: "please enter gst number" });
    if (!req.body.pincode)
      return res.status(400).send({ message: "please enter pincode" });
    if (!req.body.address)
      return res.status(400).send({ message: "please enter address" });
    if (!req.body.otpcode)
      return res.status(400).send({ message: "please enter otp" });
    if (!req.body.otpreferenceid)
      return res.status(400).send({ message: "otpreferenceid is missing" });
    if (!req.body.hash)
      return res.status(400).send({ message: "Hash code is missing" });

    var imageurl =
      "https://paysikkamerchant.s3.us-east-2.amazonaws.com/Avatar+img.jpeg";
    // calling cyrus verify otp api
    var options = {
      method: "POST",
      url: "https://cyrusrecharge.in/api/upiapi.aspx",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      formData: {
        MerchantID: process.env.MERCHANTID,
        MerchantKey: process.env.MERCHANT_KEY,
        MethodName: "submitotp",
        Mobile: req.body.merchantnumber,
        Email: req.body.merchantemail,
        Company: req.body.businessname,
        Name: req.body.merchantname,
        Pan: req.body.merchantpan,
        Pincode: req.body.pincode,
        Address: req.body.address,
        Aadhar: req.body.merchantaadhar,
        OTP: req.body.otpcode,
        otpReferenceID: req.body.otpreferenceid,
        hash: req.body.hash,
      },
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      var jsonFormat = JSON.parse(response.body);
      if (jsonFormat.statuscode == "ERR") {
        return res.status(400).json({ Error: "Outlet Id Error" });
      } else {
        var Outletid = jsonFormat.data.data.outletId;
      }
      if (Outletid) {
        passoutledtid(Outletid);
      } else {
        return res.status(400).json({ error: "Outlet Id not generated" });
      }
    });

    function passoutledtid(id) {
      // calling cyrus get oulet api
      var options = {
        method: "POST",
        url: "https://cyrusrecharge.in/api/upiapi.aspx",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        formData: {
          MerchantID: process.env.MERCHANTID,
          MerchantKey: process.env.MERCHANT_KEY,
          MethodName: "GETOUTLETSTATUS",
          Outletid: id,
        },
      };
      request(options, function (error, response) {
        if (error) throw new Error(error);
        var jsonFormat = JSON.parse(response.body);
        var upiid = jsonFormat.data[0]["UPIID"];
        if (upiid) {
          passupiid(upiid);
        } else {
          return res.status(400).json({ error: "UPI Id not Generated" });
        }
      });
    }
    function passupiid(id) {
      if (id) {
        const user = new merchant({
          merchantname: req.body.merchantname,
          merchantnumber: req.body.merchantnumber,
          merchantemail: req.body.merchantemail,
          businessname: req.body.businessname,
          merchantpan: req.body.merchantpan,
          merchantaadhar: req.body.merchantaadhar,
          merchantimage: imageurl,
          merchantwhatsappnumber: req.body.merchantwhatsappnumber,
          gstnumber: req.body.gstnumber,
          pincode: req.body.pincode,
          address: req.body.address,
          upiid: id,
        });
        try {
          // Create token
          const token = jwt.sign({ user: user }, process.env.JWT_TOKEN_SECRET);
          var save = user.save();
          if (save) {
            // return new user
            return res.json({ user, token });
          }
        } catch (error) {
          return res.json({ message: err });
        }
      } else {
        return res.status(500).json({ mes: "internal error" });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

exports.merchantlist = async (req, res) => {
  const merlist = await merchant.find();
  return res.status(200).json(merlist);
};
