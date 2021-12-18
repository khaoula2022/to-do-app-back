const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { promisify } = require("util");
const AppError = require("../utils/appError");
const jwtDecode = require("jwt-decode");

exports.protect = async (req, res, next) => {
  try {
    // 1) check if the token is there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return next(
        new AppError(
          401,
          "fail",
          "You are not logged in! Please login in to continue"
        ),
        req,
        res,
        next
      );
    }

    // 2) Verify token
    // const decode = await promisify(jwt.verify)(token, "RANDOM_TOKEN_SECRET");
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    req.userId = decodedToken.userId;
    //const tokenPayload = jwtDecode(token)._id;
    console.log("hiii idddd" + decodedToken.userId);
    // 3) check if the user exists (not deleted)
    const user = await User.findById(decodedToken.userId);
    if (!user) {
      return next(
        new AppError(401, "fail", "This user no longer exists"),
        req,
        res,
        next
      );
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
/*module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken._id;
    if (req.body._id && req.body._id !== userId) {
      throw "Invalid user ID";
    } else {
      console.log("body idddddddddddddddddddddd" + req.body._id);
      const user = await User.findOne({});

      req.user = user;
      console.log("this is rq user " + decodedToken._id);
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
*/
