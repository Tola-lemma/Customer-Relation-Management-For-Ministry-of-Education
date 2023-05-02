import { User } from "../models/user.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotfoundError } from "../error/errors.js";
import bcrypt from "bcrypt";

//only adim can see all registered users
export const getAllUsers = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const users = await User.find({}).select("-password").skip(skip).limit(limit);

  res.status(StatusCodes.OK).json({ success: true, users, count: users.length, msg: "list of users" });
};

export const getUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  if (!user)
    throw new NotfoundError(`No user with id : ${req.params.id} found.`);
  res.status(StatusCodes.OK).json({ success: true, user });
};
//only adim can register other users
export const register = async (req, res) => {
  const hashPassword = await bcrypt.hash(req.body.password, 10);
  const user = await User.create({ ...req.body, password : hashPassword });
  const token = user.jwtSign();
  res.status(StatusCodes.CREATED).json({ success: true, token, msg: "registerd" });
};

//only admin can remove accounts
export const removeAccount = async (req, res) => {
  const { id: userId } = req.params;
  const user = await User.findOneAndRemove({ _id: userId });
  if (!user) throw new NotfoundError(`No user with id : ${userId} found.`);
  res.status(StatusCodes.OK).json({ success: true, msg: "successfully deleted" });
};

//only adim can modiy user account (only their role)
//admin select the new user from the dropdown
export const updateRole = async (req, res) => {
  const {
    params: { id: userId },
    body: { role },
  } = req;

  if (!role) throw new BadRequestError("please provide the role");
  const user = await User.findOneAndUpdate(
    { _id: userId },
    { role: role },
    { new: true, runValidators: true }
  );
  if (!user) throw new NotfoundError(`No user with id : ${userId} found.`);
  res.status(StatusCodes.OK).json({ success: true, msg: "Successfully updated." });
};