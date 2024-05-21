const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");
const validator = require("validator");
const Schema = mongoose.Schema;



// Defining out Schema structure.

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Please insert an Email"],
      unique: true,
      validate: [isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please insert password"],
      minlength: [6, "Minimum password length is 6 character"],
    },
  },
  { timestamps: true }
);

// user schema statics code for signup and login

userSchema.statics.LoginUser = async function(email, password){

   // validation
   if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({email});
   if(!user){
     throw Error("Incorrect email");
   }
   const auth = await bcrypt.compare(password, user.password);
  if(!auth){
    throw Error ("Incorrect password");
  }
  return user;
}



userSchema.statics.SignUp = async function (email, password) {
  // validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }

  const userEmail = await this.findOne({ email });

  if (userEmail) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
