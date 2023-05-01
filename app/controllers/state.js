const merchant = require("../model/merchant");
const User = require("../model/user");
const states = require("../model/states");


// total users by state

exports.usersbystate = async (req, res) => {
  try {
    const result = await User.aggregate([
      {
        $group: {
          _id: "$state",
          count: { $sum: 1 },
        },
      },

      { $sort: { state: 1 } },
    ]);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};
// total merchants by state

exports.merchantsbystate = async (req, res) => {
  try {
    const result = await merchant.aggregate([
      { $match: { state: { $ne: null } } },
      {
        $group: {
          _id: "$state",
          count: { $sum: 1 },
        },
      },

      { $sort: { state: 1 } },
    ]);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).json({ mes: err });
  }
};

// backup code
exports.state = async (req, res) => {
  try {
    const result = await states.find();
    return res.status(200).json(result);
  } catch (error) {}
  return res.status(400).json({ mes: error });
};

exports.statedata = async (req, res) => {
  try {
    const userresult = await states.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "statename",
          foreignField: "state",
          as: "userbystate",
        },
      },
      {
        $project: {
          userbystate: "$statename",
          count: { $size: "$userbystate" },
        },
      },
    ]);
    const merchantresult = await states.aggregate([
      {
        $lookup: {
          from: "merchant_users",
          localField: "statename",
          foreignField: "state",
          as: "merchantbystate",
        },
      },
      {
        $project: {
          merchantbystate: "$statename",
          count: { $size: "$merchantbystate" },
        },
      },
    ]);

    console.log(userresult.length);
    console.log(merchantresult.length);

    var responseData = [];

    if (userresult.length == merchantresult.length) {
      for (i = 0; i < userresult.length; i++) {
        console.log(userresult[i]["userbystate"]);
        if (
          userresult[i]["userbystate"] == merchantresult[i]["merchantbystate"]
        ) {
          const tempdata = {
            state: userresult[i]["userbystate"],
            usercount: userresult[i]["count"],
            merchantcount: merchantresult[i]["count"],
          };

          responseData.push(tempdata);
        }
      }
    }
    return res.status(200).json(responseData);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

// exports.updateall = async(req, res) => {
//   try{
//     const response  = await states.updateMany({},{
//       $set: {
//         status:req.body.status
//       },
      
//     },
//     {
//       limit: 10
//     })
//     return res.status(200).json(response)
//   }
//   catch (err) {
//     return res.status(400).json({ message: err });
//   }
// }
