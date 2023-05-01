const admins = require("../model/admin");
const jwt = require("jsonwebtoken");
const { response } = require("express");
const sendotp = require("../service/sendotp");
const otpcodes = require("../model/otpCodes");

exports.register = async (req, res) => {
  try {
    //validations
    if (!req.body.name)
      return res.status(400).send({ message: "please enter name" });
    if (!req.body.mobile)
      return res.status(400).send({ message: "please enter mobile number" });
    if (!req.body.email)
      return res.status(400).send({ message: "please enter email" });

    // check if user already exist
    const adminemail = req.body.email;
    const oldUser = await admins.findOne({ adminemail });
    if (oldUser) {
      return res.status(400).json({ mes: "User Already Exist. Please Login" });
    }
    // Validate if user exist in our database
    const adminnumber = req.body.mobile;
    const number = await admins.findOne({ adminnumber });
    if (number) {
      return res.status(400).json({ mes: "User Already Exist. Please Login" });
    }
    // Create user in our database
    const admin = await new admins({
      name: req.body.name,
      mobile: req.body.mobile,
      email: req.body.email, // sanitize: convert email to lowercase
    });
    // Create token
    const token = jwt.sign({ admin: admin }, process.env.JWT_TOKEN_SECRET);
    // save user
    admin.save();
    // res user info and token
    response.admin = admin;
    response.token = token;
    // return new user
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
  }
};

exports.login = async (req, res) => {
  try {
    // Get user input
    const { mobile } = req.body;
    // Validate user input
    if (!mobile) {
      return res.status(400).json({ msg: "Mobile number is required" });
    }
    // Validate if user exist in our database
    await admins.findOne({ mobile: req.body.mobile }).then((user) => {
      //if user not exist than return status 400
      if (!user) {
        return res.status(400).json({ msg: "User not exist" });
      }
      //if user exist than return user
      if (user) {
        // Create token
        const token = jwt.sign({ user: user }, process.env.JWT_TOKEN_SECRET);
        // return response user with token
        response.admin = user;
        response.token = token;
        //sending otp to user mobile
        sendotp.otpsend(user.mobile);
        return res.status(200).json(response);
      } else {
        return res.status(401).json({ msg: "Invalid credencial" });
      }
    });
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

exports.verifyotp = async (req, res) => {
  try {
    // Validate user input
    if (!req.body.mobile)
      return res.status(400).json({ mes: "mobile number required" });
    if (!req.body.code)
      return res.status(400).json({ mes: "code is required" });
    //getting otp list from collection
    var myotp = await otpcodes
      .findOne({ mobile: req.body.mobile })
      .sort({ otpid: -1 });
    var code = myotp.code;
    //verifying request code match with collection code
    if (code == req.body.code) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ success: false });
    }
  } catch (err) {
    return res.status(400).json({ mes: err });
  }
};

exports.checking = async (req, res) => {
  res.status(200).json("done");
};
