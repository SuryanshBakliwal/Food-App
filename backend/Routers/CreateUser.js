const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const { body, validationResult } = require("express-validator");

const jwt_key = "ifhgdiuyegfvvbjxvi";

const userRouter = express.Router();

userRouter.post(
  "/createuser",
  [
    body("email", "Incorrect Email").isEmail(),
    body("password", "Incorrect password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    try {
      await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        location: req.body.location,
      }).then(
        res.json({
          message: "Created",
        })
      );
    } catch (error) {
      res.json({
        message: "Not Created",
      });
    }
  }
);

userRouter.post(
  "/loginuser",
  [
    body("email", "Incorrect Email").isEmail(),
    body("password", "Incorrect password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    let email = req.body.email;
    let password = req.body.password;
    try {
      await User.findOne({ email })
        .then(async (user) => {
          let comparePass = await bcrypt.compare(password, user.password);
          console.log(comparePass);
          let uid = user["_id"];
          let authToken = await jwt.sign({ payload: uid }, jwt_key);
          if (comparePass) {
            return res.json({
              message: "User Found",
              authToken: authToken,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          return res.json({
            message: "Try with correct credentials",
          });
        });
    } catch (error) {
      console.log(error);
      res.json({
        message: "Not Created",
      });
    }
  }
);

module.exports = userRouter;
