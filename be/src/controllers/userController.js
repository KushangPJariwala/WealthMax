const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signupUser = async (req, res) => {
  try {
    const uemail = await User.findOne({ email: req.body.email });
    const upan = await User.findOne({ pan: req.body.pan });
    const accountNum = await User.findOne({ accountNum: req.body.accountNum });

    if (uemail) {
      res.status(400).send({
        success: false,
        exists: true,
        message: `email ${req.body.email} Already Registered`,
      });
    } else if (upan) {
      res.status(400).send({
        success: false,
        exists: true,
        message: `Pan number ${req.body.pan} Already Registered`,
      });
    } else if (accountNum) {
      res.status(400).send({
        success: false,
        exists: true,
        message: `Account number ${req.body.accountNum} is already linked, Please use another one`,
      });
    } else {
      const user = new User(req.body);
      await user.save();

      res
        .status(200)
        .send({ success: true, user, message: "Registration Successful" });
    }
  } catch (err) {
    console.log("err", err);
    res.status(400).send({ success: false, error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).send({ message: "User does not exist!" });
    }

    if (user && !req.body.password) {
      return res.status(200).send({ exists: true, message: "User exists" });
    }

    if (user && req.body.password) {
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res.status(400).send({ user, message: "Invalid credentials!" });
      } else {
        const token = await user.generateAuthToken();
        // console.log("tokernnnnnnnnnn");
        // Set the token in a cookie (this will be accessible on the client-side)
        res.cookie("token", token, {
          maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expires in 7 days
        });
        res.cookie("user", JSON.stringify(user), {
          maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expires in 7 days
        });

        return res.status(200).send({
          user,
          message: "Login successful",
          loggedin: true,
          // token,
        });
      }
    }
  } catch (err) {
    res.status(500).send({ message: "Internal server error" });
  }
};
const getUser = async (req, res) => {
  try {
    // console.log(req.user);

    return res.status(200).send({ message: "user fetched", user: req.user });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error" });
  }
};

const getBankDetails = async (req, res) => {
  // console.log("req.user", req.user);
  try {
    const user = await User.findOne({ _id: req.user.id });
    // console.log("user", user);
    const bankDetails = {
      bankName: user.bankName,
      ifsc: user.ifsc,
      accountNum: user.accountNum,
    };

    return res.status(200).send({ message: "user fetched", bankDetails });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error" });
  }
};
module.exports = { signupUser, login, getUser, getBankDetails };
