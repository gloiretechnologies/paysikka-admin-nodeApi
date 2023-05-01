const otpcodes = require("../model/otpCodes");

// Total Admin OTP List

exports.adminotps = async(req, res) => {
    try{
        const response = await otpcodes.find({ category : "admin"})
        return res.status(200).json(response)
    }
    catch (err) {
        return res.status(400).json({ message: err });
      }
},

exports.merchantotps = async(req, res) => {
    try{
        const response = await otpcodes.find({ category : "merchant"})
        return res.status(200).json(response)
    }
    catch (err) {
        return res.status(400).json({ message: err });
      }
},
exports.userotps = async(req, res) => {
    try{
        const response = await otpcodes.find({ category : "user"})
        return res.status(200).json(response)
    }
    catch (err) {
        return res.status(400).json({ message: err });
      }
}