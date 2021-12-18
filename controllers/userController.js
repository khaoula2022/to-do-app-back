const User = require("../models/userModel");
const base = require("./baseController");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const createToken = (id) => {
  return jwt.sign({ id: User._id }, "RANDOM_TOKEN_SECRET", {
    expiresIn: "24h",
  });
};

/*const createToken = (id) => {
  return jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};
/******************************SIGNUP */

exports.signup = async (req, res, next) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "khaouladevops2022@gmail.com",
        pass: "devops2022",
      },
    });
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });
    let mailOptions = {
      from: "khaouladevops2022@gmail.com", // TODO: email sender
      to: user.email, // TODO: email receiver
      subject: "Welcome To-do ",
      text: `welcome , you  can start creating tasks`,
    };
    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        console.log("Error occurs", err);
      } else console.log("Email sent!!!");
    });
    const token = createToken(user.id);

    user.password = undefined;

    res.status(201).json({
      status: "success",
      token,
      data: {
        user,
        token,
      },
    });
  } catch (err) {
    next(err);
  }
};
/*****************************LOGIN */
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(
        new AppError(404, "fail", "Please provide email or password"),
        req,
        res,
        next
      );
    }

    const user = await User.findOne({
      email,
    }).select("+password");
    console.log("logiiiiiiiiiiiin" + user);

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(
        new AppError(401, "fail", "Email or Password is wrong"),
        req,
        res,
        next
      );
    }

    const token = createToken(user._id);
    console.log(token);

    user.password = undefined;

    res.status(200).json({
      status: "success",

      token,
      userId: user._id,
      token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
        expiresIn: "2m",
      }),
      data: {
        user,
        token,
      },
    });
    req.user = user;

    console.log("useeeeeeeeeeer  " + user);
    req.userIdd = user.email;
    console.log("this is userIDDDDD" + req.userIdd);
    console.log("this is email" + user.email);
  } catch (err) {
    next(err);
  }
};
/*exports.login = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(401).json({ error: "Utilisateur non trouvé !" });
  }
  bcrypt
    .compare(req.body.password, user.password)
    .then((valid) => {
      if (!valid) {
        return res.status(401).json({ error: "Mot de passe incorrect !" });
      }
      res.status(200).json({
        userId: user._id,
        token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
          expiresIn: "24h",
        }),
      });
    })

    .catch((error) => res.status(500).json({ error }));
};*/
