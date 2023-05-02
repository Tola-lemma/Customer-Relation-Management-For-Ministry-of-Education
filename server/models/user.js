import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "name is required"],
    minLength: 3,
    maxLength: 50,
  },
  username: {
    type: String,
    require: [true, "username is required"],
    minLength: 5,
    unique: true,
  },
  role: {
    type: String,
    enum: ["admin", "staffmember", "guest"],
    require: [true, "role is required"],
    default: "staffmember",
  },
  password: {
    type: String,
    require: [true, "password is required."],
    minLength: [6, "should contain more than 6 characters"],
  },
});

userSchema.methods.jwtSign = function () {
  return jwt.sign({ userId: this._id, role: this.role }, process.env.SECRET, {
    expiresIn: process.env.LIFETIME,
  });
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);
