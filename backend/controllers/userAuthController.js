const mongoose = require("mongoose");
const UserModel = require("../models/userLogin");
const jwt = require("jsonwebtoken");

// createToken method

const createToken = ({ _id }) => {
  // the first arguement is usually the payload
  // second arg is the secret string
  // third arg its an optional parameter
  return jwt.sign({ _id }, process.env.SECRET_STRING, { expiresIn: "3d" });
};



module.exports.signUpUser = async (req, res) => {
  const { name, phone } = req.body;

  try {
    const user = await UserModel.SignUp(name, phone);
    const token = createToken(user._id);
    res.status(200).json({ phone, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
