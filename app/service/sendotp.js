const crypto = require("crypto");
const axios = require("axios");
const otpcodes = require("../model/otpCodes");

function otpsend(number) {
  try {
    const randomnumber = crypto.randomInt(0, 1000000);
    const otp = randomnumber.toString().padStart(6, "0");
    const mobilenumber = number;
    const otpcode = otpcodes.create({
      mobile: mobilenumber,
      code: otp,
    });
    otpcode.save;
    const url =
      "https://api.textlocal.in/send/?apikey=NmM0YzY2Nzc2MTZiNzk2NDc0NDg1MjQ2NjM3ODZlNGM=&numbers=91" +
      number +
      "&sender=PAYSIK&message=" +
      encodeURIComponent(
        `${otp} is your Paysikka OTP. Do not share it with anyone.`
      );
    axios.get(url).then(function (response) {
      console.log(response.data);
      return true;
    });
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = { otpsend };
