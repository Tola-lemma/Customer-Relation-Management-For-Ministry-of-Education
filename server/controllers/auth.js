import { StatusCodes } from "http-status-codes";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import {
  BadRequestError,
  NotfoundError,
  UnauthenticatedError,
} from "../error/errors.js";

export const login = async (req, res) => {
  const { password, username } = req.body;
  if (!password || !username) {
    throw new BadRequestError("please provide username and password");
  }
  const user = await User.findOne({ username });
  if (!user) throw new NotfoundError("Invalid Credential.");

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new UnauthenticatedError("Incorrect Password");

  const token = user.jwtSign();
  res.status(StatusCodes.CREATED).json({ success: true, token, msg: "login" });
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
  if (newPassword.length < 6)
    throw new BadRequestError("password should contain more than 6 characters");
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
