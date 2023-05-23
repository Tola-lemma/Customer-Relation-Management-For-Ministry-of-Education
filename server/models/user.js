import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//replace user with email
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    minLength: 3,
    maxLength: 50,
  },
  phoneNumber: {
    type: String,
    required: [true, "phone number  is required"],
    minLength: 10,
    maxLength: 10,
  },
  email : {
    type : String,
    required : [true, "email is required"],
    match : [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    , 'invalid email address'],
    unique: true
  },
  role: {
    type: String,
    enum: ["admin", "transferCoordinator", "studyAbroadCoordinator", "scholarshipCoordinator", "complaintsCoordinator"],
    required: [true, "role is required"],
  },
  password: {
    type: String,
    required: [true, "password is required."],
  },
  resetPasswordToken:{
    type : String,
    default : null
  },
  resetPasswordExpires:{
    type : Date,
    default : null
  }
}, {timestamps : true});

userSchema.methods.jwtSign = function () {
  return jwt.sign({ userId: this._id, role: this.role }, process.env.SECRET, {
    expiresIn: process.env.LIFETIME,
  });
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);
