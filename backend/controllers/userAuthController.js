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


// hndle


module.exports.signUpUser = async (req, res) => {
  const { name, phone, score } = req.body;

  try {
    const user = await UserModel.SignUp(name, phone, score);

    const userId = user._id;
    const token = createToken(user._id);
    res.status(200).json({ userId, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports.player_update = async (req, res) => {
  //   res.json({ msg: "Update workout" });

  try {
    const paramsID = req.params.id;
    const updatedValue = req.body;
    if (!mongoose.Types.ObjectId.isValid(paramsID)) {
      return res.status(404).json({ error: "The player does not exist" });
    }
    const updatedPlayer = await UserModel.findByIdAndUpdate(
      paramsID,
      updatedValue,
      { new: true }
    );

    if (!updatedPlayer) {
      return res.status(404).json({ error: "No such player" });
    }

    res.status(200).json({ success: true, updatedPlayer });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};