const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).send("Access Denied");
  try {
    const verified = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    req.AuthId = verified.user.admin_id;
    next();
    // console.log(req.AuthId);
  } catch (err) {
    res.status(400).json({ Error: "Invalid Token" });
  }
};
