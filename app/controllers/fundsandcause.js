const fundsandcause = require("../model/fundsandcause");

exports.addfund = async(req, res) => {
    try{
        let addfund = new fundsandcause({
            banner: req.body.banner,
            details: req.body.details,
            expirydate: req.body.expirydate,
            upi_id: req.body.upi_id,
            fundname: req.body.fundname,
            status: req.body.status
        })
        await addfund.save();
        return res.status(200).json(addfund);
    }catch (err) {
        return res.status(400).json({ message: err });
      }
};

// Get all Funds and Causes

exports.getfunds = async(req, res) => {
     try{
         const funds = await fundsandcause.find();
         return res.status(200).json(funds)
    }catch (err) {
         return res.status(400).json({ message: err });
  }
};

// Get single fund and cause

exports.singlefund = async(req, res) => {
    try{
        const fund = await fundsandcause.find({_id: req.params.id});
        return res.status(200).json(fund)
    }catch (err) {
         return res.status(400).json({ message: err });
  }
};


// Delete the fund and cause
exports.removefund = async(req, res) => {
    try{
        const removefund = await fundsandcause.deleteOne({_id: req.params.id})
        return res.status(200).json(removefund)
    }catch (err) {
        return res.status(400).json({ message: err });
      }
    };

// update the fund and cause
exports.updatefund = async(req, res) => {
    try{
        const updatefund = await fundsandcause.updateOne({_id: req.params.id},
            {
             $set: {
                banner: req.body.banner,
                details: req.body.details,
                expirydate: req.body.expirydate,
                upi_id: req.body.upi_id,
                fundname: req.body.fundname,
                status: req.body.status
                    }
                })
            return res.status(200).json(updatefund)
        }catch (err) {
            return res.status(400).json({ message: err });
          }
        };

