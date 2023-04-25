import mongoose from "mongoose";

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
    enum: ["admin", "staffmember"],
    require: [true, "role is required"],
    default: "staffmember",
  },
  password: {
    type: String,
    require: [true, "password is required."],
    minLength: [6, "should contain more than 6 characters"],
  },
});

const User = mongoose.model("User", userSchema);
