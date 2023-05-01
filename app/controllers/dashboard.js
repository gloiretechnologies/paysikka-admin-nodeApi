const moment = require("moment");
const User = require("../model/user");
const merchant = require("../model/merchant");
const Transactions = require("../model/transaction");

// total merchant users

exports.merchantusers = async (req, res) => {
  try {
    const merchantlist = await merchant.find();
    return res.status(200).json(merchantlist);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

// merchant users count

exports.merchantcount = async (req, res) => {
  try {
    const merchantcount = await merchant.find().count();
    return res.status(200).json(merchantcount);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

//  Recent registered  merchant users

exports.recentmerchants = async (req, res) => {
  try {
    const recentmerchants = await merchant
      .find({
        createdAt: {
          $gte: moment().add(-10, "days"),
        },
      })
      .sort({ createdAt: -1 });

    return res.status(200).json(recentmerchants);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

// Get Total users

exports.totalusers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

// Recent registered  users

exports.recentusers = async (req, res) => {
  try {
    const recentusers = await User.find({
      date: {
        $gte: moment().add(-30, "days"),
      },
    }).sort({ date: -1 });

    return res.status(200).json(recentusers);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

// users transactions

exports.usertransactions = async (req, res) => {
  // validations
  if (!req.body.userid)
    return res.status(400).send({ message: "userid is missing" });
  try {
    var result = await Transactions.find({ userid: req.body.userid });
    if (result.length == 0) {
      return res.status(200).json({ mes: "No data" });
    } else {
      return res.status(200).json(result);
    }
  } catch (error) {
    return res.status(400).json({ mes: error });
  }
};

exports.useralltransactions = async (req, res) => {
  try {
    var result = await Transactions.find({ type: "P2P" });
    if (result.length == 0) {
      return res.status(200).json({ mes: "No data" });
    } else {
      return res.status(200).json(result);
    }
  } catch (error) {
    return res.status(400).json({ mes: error });
  }
};

exports.usersingletransaction = async (req, res) => {
  try {
    const response = await Transactions.aggregate([
      {
        $match: { type: "P2P" },
      },
      {
        $lookup: {
          from: "user",
          localField: "transactionid",
          foreignField: "transactionid",
          as: "userdetails",
        },
      },
    ]);
    if (response) return res.status(200).json(response);
    else return res.status(400).json({ message: "transaction not found" });
  } catch (error) {
    return res.status(400).json({ mes: error });
  }
};

// merchant transactions

exports.merchanttransactions = async (req, res) => {
  // validations
  if (!req.body.mupi)
    return res.status(400).send({ message: "merchant upi code is missing" });
  try {
    var result = await Transactions.find({ mupi: req.body.mupi });
    if (result.length == 0) {
      return res.status(200).json({ mes: "No data" });
    } else {
      return res.status(200).json(result);
    }
  } catch (error) {
    return res.status(400).json({ mes: error });
  }
};

exports.merchantalltransactions = async (req, res) => {
  try {
    var result = await Transactions.find({ type: "P2M" });
    if (result.length == 0) {
      return res.status(200).json({ mes: "No data" });
    } else {
      return res.status(200).json(result);
    }
  } catch (error) {
    return res.status(400).json({ mes: error });
  }
};

exports.merchantsingletransaction = async (req, res) => {
  try {
    const response = await Transactions.aggregate([
      {
        $match: { type: "P2M" },
      },
      {
        $lookup: {
          from: "merchant_users",
          localField: "mupi",
          foreignField: "upiid",
          as: "merchantdetails",
        },
      },
    ]);
    if (response) return res.status(200).json(response);
    else return res.status(400).json({ message: "transaction not found" });
  } catch (error) {
    return res.status(400).json({ mes: error });
  }
};

exports.usersperday = async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $addFields: {
          createdAtDate: {
            $toDate: "$date",
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$date",
            },
          },
          count: {
            $sum: 1,
          },
        },
      },
      {
        $project: {
          count: 1,
          date: "$_id",
          _id: 0,
        },
      },
      { $sort: { date: -1 } },
    ]);
    return res.status(200).json(users);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

exports.merchantspermonth = async (req, res) => {
  try {
    const result = await merchant.aggregate([
      {
        $match: {
          createdAt: {
            $lte: new Date(),
            $gte: new Date(new Date().setDate(new Date().getDate() - 360)),
          },
        },
      },
      {
        $group: {
          _id: {
            month: {
              $arrayElemAt: [
                [
                  " ",
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ],
                { $month: "$createdAt" },
              ],
            },
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          count: 1,
          month: "$_id.month",
          _id: 0,
        },
      },
      { $sort: { month: -1 } },
    ]);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).json({ mes: err });
  }
};

// Merchants last Six months Registrations
exports.merchantssixmonths = async (req, res) => {
  try {
    const result = await merchant.aggregate([
      {
        $match: {
          createdAt: {
            $lte: new Date(),
            $gte: new Date(new Date().setDate(new Date().getDate() - 180)),
          },
        },
      },
      {
        $group: {
          _id: {
            month: {
              $arrayElemAt: [
                [
                  "",
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ],
                { $month: "$createdAt" },
              ],
            },
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          count: 1,
          month: "$_id.month",
          _id: 0,
        },
      },
      { $sort: { month: -1 } },
    ]);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).json({ mes: err });
  }
};

// Users per month Data
exports.userspermonth = async (req, res) => {
  try {
    const result = await User.aggregate([
      {
        $match: {
          date: {
            $lte: new Date(),
            $gte: new Date(new Date().setDate(new Date().getDate() - 360)),
          },
        },
      },
      {
        $group: {
          _id: {
            month: {
              $arrayElemAt: [
                [
                  "",
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ],
                { $month: "$date" },
              ],
            },
          },
          count: {
            $sum: 1,
          },
        },
      },
      {
        $project: {
          count: 1,
          month: "$_id.month",
          _id: 0,
        },
      },
      { $sort: { month: -1 } },
    ]);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).json({ mes: err });
  }
};
