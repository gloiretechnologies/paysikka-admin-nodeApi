const vendor = require("../model/vendor");


// Add vendor
exports.addvendor = async(req, res) => {
    try{
        let response = new vendor({
            vendorname: req.body.vendorname,
            availability: req.body.availability,
            timings: req.body.timings,
            vendoritems: req.body.vendoritems,
            mobilenumber: req.body.mobilenumber
        })
        await response.save();
        return res.status(200).json(response);
    }catch (err) {
        return res.status(400).json({ message: err });
      }
};

// get vendor details
exports.getvendor = async(req, res) => {
    try{
       const vendors = await vendor.find()
       return res.status(200).json(vendors)
    }catch (err) {
        return res.status(400).json({ message: err });
      }
};

// get single vendor details with items
exports.getvendor = async(req, res) => {
    try{
       const vendors = await vendor.find({_vendorid: req.params.id})
       return res.status(200).json(vendors)
    }catch (err) {
        return res.status(400).json({ message: err });
      }
};

// Delete the vendor
exports.removevendor = async(req, res) => {
try{
    const removevendor = await vendor.deleteOne({_vendorid: req.params.id})
    return res.status(200).json(removevendor)
}catch (err) {
    return res.status(400).json({ message: err });
  }
};

// update the Vendor
exports.updatevendor = async(req, res) => {
    try{
       const response = await vendor.updateOne({ _vendorid : req.params.vendorid},
        {
            $set: {
            vendorname: req.body.vendorname,
            availability: req.body.availability,
            timings: req.body.timings,
            vendoritems: req.body.vendoritems,
            mobilenumber: req.body.mobilenumber
            }
        })
        return res.status(200).json(response)
    }
    catch (err) {
        return res.status(400).json({ message: err });
      }
}



