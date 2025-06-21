const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');

module.exports = async function (req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token) {
      req.flash("error", "You need to log in to continue");
      return res.redirect("/");
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const user = await userModel.findOne({ email: decoded.email }).select("-password");

    if (!user) {
      req.flash("error", "User not found");
      return res.redirect("/");
    }

    req.user = user;
    next();

  } catch (err) {
    console.error("Auth Middleware Error:", err.message);
    req.flash("error", "Something went wrong");
    res.redirect("/");
  }
};
