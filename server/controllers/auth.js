import { StatusCodes } from "http-status-codes";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  BadRequestError,
  NotfoundError,
  UnauthenticatedError,
} from "../error/errors.js";
import { resetPasswordMailOptions } from "../utils/mailOptions.js";
import { sendMail } from "../utils/sendmail.js";

export const login = async (req, res) => {
  const { password, email } = req.body;
  if (!password || !email) {
    throw new BadRequestError("please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) throw new NotfoundError("Invalid Credential.");

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new UnauthenticatedError("Incorrect Password");

  const token = user.jwtSign();
  res.status(StatusCodes.CREATED).json({ success: true, token, username : user.name, role : user.role, msg: "login" });
};

export const changePassword = async (req, res) => {
  const { oldPassword, newPassword, confirmNewPassword } = req.body;

  // validate the request parameters
  if (!oldPassword || !newPassword || !confirmNewPassword)
    throw new BadRequestError(
      "please provide new password and your current password."
    );

  if (newPassword !== confirmNewPassword)
    throw new BadRequestError("password does not match.");

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!passwordRegex.test(newPassword))
    throw new BadRequestError(
      "Password should contain at least one uppercase letter, one lowercase letter, one digit, and one special symbol. It should be at least 8 characters long."
    );

  // retrieve the user's data from the database
  const user = await User.findById(req.user.Id);
  if (!user) throw new NotfoundError(`No user with id : ${req.user.Id} found.`);

  // verify that the old password matches the password stored in the database
  const isMatch = await user.comparePassword(oldPassword);

  if (!isMatch) throw new BadRequestError("old password is incorrect");
  // hash and update the user's password with the new password in the databas
  const hashPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashPassword;
  await user.save();

  res
    .status(StatusCodes.OK)
    .json({ success: true, msg: "Password Successfully Updated" });
};

export const forgetPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) throw new BadRequestError("Please provide an email address");
  const user = await User.findOne({ email: req.body.email });
  if (!user) throw new NotfoundError("oops!, User not found.");

  // Generate a jwt token
  const token = jwt.sign({ userId: user._id }, process.env.RESET_SECRET, {
    expiresIn: process.env.TOKEN_LIFETIME,
  });

  // Update the user's resetPasswordToken and resetPasswordExpires fields in the database
  await user.updateOne({
    resetPasswordToken: token,
    resetPasswordExpires: Date.now() + 60 * 60 * 1000, // 60 minutes
  });

  // Send an email to the user with a link to the reset password page
  const requestLink = `http://localhost:3000/reset-password/${token}/${user._id}`;

  const result = await sendMail(
    resetPasswordMailOptions(user.name, user.email, requestLink)
  );
  if (!result) throw new Error("Failed to send email");

  res
    .status(StatusCodes.OK)
    .json({ successs: true, msg: "Password reset link sent to your email" });
};

export const getResetPassword = async (req, res) => {
  const { token } = req.params;
  const user = await User.findOne({
    _id: req.params.userId,
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });
  if (!user) throw new BadRequestError("Invalid or expired reset token");
  res
    .status(StatusCodes.OK)
    .json({ success: true, token, msg: "Please enter your password" });
};

export const resetPassword = async (req, res) => {
  const { password, confirmPassword } = req.body;
  const { token } = req.params;

  const decoded = jwt.verify(token, process.env.RESET_SECRET);
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!confirmPassword || !passwordRegex.test(password))
    throw new BadRequestError(
      "Password should contain at least one uppercase letter, one lowercase letter, one digit, and one special symbol. It should be at least 8 characters long."
    );

  if (password !== confirmPassword)
    throw new BadRequestError("Password does not match.");

  const user = await User.findOne({
    _id: decoded.userId,
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) throw new BadRequestError("Invalid or expired reset token.");

  const hashedPassword = await bcrypt.hash(password, 10);

  user.password = hashedPassword;
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;
  await user.save();

  res
    .status(StatusCodes.OK)
    .json({ success: true, msg: "Password reset successful" });
};

export const updateAccount = async (req, res) => {
  const { name, phoneNumber, email } = req.body;

  if(!name || !phoneNumber || !email) {
    
  }
  const user = await User.findOneAndUpdate(
    { _id: req.user.Id, role: req.user.role },
    { name, phoneNumber, email },
    { runValidators: true, new: true }
  );

  if (!user) throw new BadRequestError("");
  res
    .status(StatusCodes.OK)
    .json({ success: true, msg: "Account updated successfully." });
};

export const checkAuth = async(req, res) => {
  res.status(StatusCodes.OK).json({success : true, role : req.user.role})
}