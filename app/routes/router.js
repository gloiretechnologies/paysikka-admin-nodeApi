const express = require("express");
const route = express.Router();
const verify = require("./verifytoken");

const admincontroller = require("../controllers/admin");
const merchantcontroller = require("../controllers/merchant");
const dashboardcontroller = require("../controllers/dashboard");
const otplistcontroller = require("../controllers/otplist");
const statecontroller = require("../controllers/state");
const profileupdatecontroller = require("../controllers/profileupdates");
const qrcodecontroller = require("../controllers/qrcode");
const promotioncontroller = require("../controllers/promotion");
const fundsandcausecontroller = require("../controllers/fundsandcause");
const vendorcontroller = require("../controllers/vendor");
const notificationcontroller = require("../controllers/notification");


// Api routes

route.post("/register", admincontroller.register);
route.post("/login", admincontroller.login);
route.post("/verifyotp", admincontroller.verifyotp);

// routes with verify token

route.post("/merchantregister", verify, merchantcontroller.register);
route.post(
  "/merchantverifyotp",
  verify,
  merchantcontroller.registrationverifyotp
);
route.get("/merchantlist", verify, merchantcontroller.merchantlist);
route.get("/merchantusers", verify, dashboardcontroller.merchantusers);
route.get("/merchantcount", verify, dashboardcontroller.merchantcount);
route.get("/recentmerchants", verify, dashboardcontroller.recentmerchants);
route.get("/totalusers", verify, dashboardcontroller.totalusers);
route.get("/recentusers", verify, dashboardcontroller.recentusers);
route.get("/usertransactions", verify, dashboardcontroller.usertransactions);
route.get(
  "/useralltransactions",
  verify,
  dashboardcontroller.useralltransactions
);
route.get(
  "/merchantalltransactions",
  verify,
  dashboardcontroller.merchantalltransactions
);
route.get(
  "/merchanttransactions",
  verify,
  dashboardcontroller.merchanttransactions
);
route.get("/usersperday", verify, dashboardcontroller.usersperday);
route.get("/merchantspermonth", verify, dashboardcontroller.merchantspermonth);
route.get(
  "/merchantssixmonths",
  verify,
  dashboardcontroller.merchantssixmonths
);
route.get("/userspermonth", verify, dashboardcontroller.userspermonth);
route.get("/adminotplist", verify, otplistcontroller.adminotps);
route.get("/merchantotplist", verify, otplistcontroller.merchantotps);
route.get("/userotplist", verify, otplistcontroller.userotps);
route.get("/statewisecount", verify, statecontroller.statedata);
route.get(
  "/merchantsingletransaction",
  verify,
  dashboardcontroller.merchantsingletransaction
);
route.get(
  "/usersingletransaction",

  dashboardcontroller.usersingletransaction
);
route.post(
  "/merchantprofileupdate",
  verify,
  profileupdatecontroller.profileupdatemerchant
);
route.post(
  "/userprofileupdate",
  verify,
  profileupdatecontroller.profileupdateuser
);
route.get(
  "/merchantprofile/:id",
  verify,
  profileupdatecontroller.merchantprofile
);
route.get("/userprofile/:id", verify, profileupdatecontroller.userprofile);
route.post("/qrcode", verify, qrcodecontroller.Qrcode);

// Promotions
route.post("/addpromotiontype",verify, promotioncontroller.promotiontype);
route.get("/promotiontypes",promotioncontroller.getpromotiontypes);
route.post("/addpromotionpackage",promotioncontroller.promotionpackage);
route.get("/promotionpackageswithtype",verify, promotioncontroller.promotionpackageswithtype);
route.get("/promotiontype/:id", verify,promotioncontroller.getpromotiontype);
route.get("/promotionpackage/:id", promotioncontroller.getpromotionpackage);
route.put("/promotionpackage/:id",verify,promotioncontroller.updatepromotionpackage);
route.delete("/promotionpackage/:id", verify,promotioncontroller.removepromotionpackage);
route.put("/promotiontype/:id",verify,promotioncontroller.updatepromotiontype);


// FundsAndCause

route.post("/addfund",verify, fundsandcausecontroller.addfund);
route.get("/fundsandcause",verify, fundsandcausecontroller.getfunds);
route.get("/fundsandcause/:id",verify, fundsandcausecontroller.getfunds);
route.delete("/fundsandcause/:id",verify, fundsandcausecontroller.removefund);
route.put("/fundsandcause/:id",verify, fundsandcausecontroller.updatefund);

// Vendors
route.post("/addvendor",verify,vendorcontroller.addvendor );
route.get("/vendorwithitems",verify,vendorcontroller.getvendor );
route.get("/vendorwithitems/:vendorid",verify,vendorcontroller.getvendor );
route.delete("/vendor/:vendorid",verify,vendorcontroller.removevendor );
route.put("/vendor/:vendorid",verify,vendorcontroller.updatevendor );
// route.put("/updateall",statecontroller.updateall );



route.post("/sendnotification",notificationcontroller.sendnotification);




module.exports = route;
