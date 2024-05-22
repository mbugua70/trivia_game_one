const mongoose = require("mongoose");
const { isEmail } = require("validator");
const validator = require("validator");
const Schema = mongoose.Schema;

// Defining out Schema structure.

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please insert an name"],
    },
    phone: {
      type: Number,
      required: [true, "Please insert phone number"],
      unique: true,
    },
  },
  { timestamps: true }
);

userSchema.statics.SignUp = async function (name, phone) {
  // validation
  if (!name || !phone) {
    throw Error("All fields must be filled");
  }

  const userPhone = await this.findOne({ phone });

  if (userPhone) {
    throw Error("Phone already in use");
  }

  const user = await this.create({ name, phone });

  return user;
};

const UserModel = mongoose.model("Player", userSchema);
module.exports = UserModel;
