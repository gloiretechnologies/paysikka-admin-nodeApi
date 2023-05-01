const promotiontype = require("../model/promotiontype");
const promotionpackages = require("../model/promotionpackage");
    
// Add The Promotion Type
exports.promotiontype = async(req, res) => {
    try {
        let promotion = new promotiontype({
            // promotionid: req.body.promotionid,
            promotiontype: req.body.promotiontype,
            // status: req.body.status,
            description: req.body.description
       })
       await promotion.save();
       return res.status(200).json(promotion);
    }
    catch (err) {
        return res.status(400).json({ message: err });
      }
};

// Get  All Promotion Types
exports.getpromotiontypes = async(req, res) => {
    try {
       const promotions = await promotiontype.find();
       return res.status(200).json(promotions)
    }
    catch (err) {
        return res.status(400).json({ message: err });
      }
};

// get single packagetype
exports.getpromotiontype = async(req, res) => {
    try {
       const promotion = await promotiontype.find({_id: req.params.id});
       if(promotion){
        return res.status(200).json(promotion)
    }else{
        return res.status(500).send('Internal Server Error')
    }
    }
    catch (err) {
        return res.status(400).json({ message: err });
      }
};

// Get single Promotionpacakge
exports.getpromotionpackage = async(req, res) => {
    try {
       const promotion = await promotionpackages.find({_id: req.params.id});
       if(promotion){
        return res.status(200).json(promotion)
    }
    }
    catch (err) {
        return res.status(400).json({ message: err });
      }
};

// Add Promotion Packages
exports.promotionpackage = async(req, res) => {
    try {
       let promotion = new promotionpackages({
           promotionid: req.body.promotionid,
           validity: req.body.validity,
           cost: req.body.cost,
           status: req.body.status,
           include1: req.body.include1,
           include2: req.body.include2,
           include3: req.body.include3
       });
       await promotion.save();
       return res.status(200).json(promotion)
    }
    catch (err) {
        return res.status(400).json({ message: err });
      }
};

// Get promotion Package with Promotion Type
exports.promotionpackageswithtype = async(req, res) => {
    try {
        const promotion = await promotiontype.aggregate([
            {
                $lookup: {
                    from: "promotionpackages",
                    localField: "promotionid",
                    foreignField: "promotionid",
                    as: "promotionpackagedetails"
                }
            },   
        ]);
        return res.status(200).json(promotion)
    }
    catch (err) {
        return res.status(400).json({ message: err });
      }
};

// Update Promotion Package
exports.updatepromotionpackage = async(req, res) => {
    try {
       const promotion = await promotionpackages.updateOne(
        {_id: req.params.id},
        {$set: {
            validity: req.body.validity,
            cost: req.body.cost,
            include1: req.body.include1,
            include2: req.body.include2,
            include3: req.body.include3,  
        }})
        return res.status(200).json(promotion)
    }
    catch (err) {
        return res.status(400).json({ message: err });
      }
};

// Delete Promotion Package
exports.removepromotionpackage = async(req, res) => {
    try {
       const promotion = await promotionpackages.deleteOne({ _id: req.params.id });
       return res.status(200).json(promotion)
    }
    catch (err) {
        return res.status(400).json({ message: err });
      }
};

// Update Promotion Type
exports.updatepromotiontype = async(req, res) => {
    try {
       const promotion = await promotiontype.updateOne(
        {_id: req.params.id},
        {$set: {
            promotiontype: req.body.promotiontype,
            description: req.body.description,
             
        }})
        return res.status(200).json(promotion)
    }
    catch (err) {
        return res.status(400).json({ message: err });
      }
};


// Get Single Promotion Package with Promotiontype
// exports.singlepromotionpackagewithtype = async(req, res) => {
//     try {
//         const promotion = await promotiontype.aggregate([
//             {
//                 $lookup: {
//                     from: "promotionpackages",
//                     localField: "promotionid",
//                     foreignField: "promotionid",
//                     as: "promotionpackagedetails"
//                 }
//             },
//             // { limit: 1 }
//     ])
//             return res.status(200).json(promotion)
//     } 
//     catch (err) {
//         return res.status(400).json({ message: err });
//       }
// }