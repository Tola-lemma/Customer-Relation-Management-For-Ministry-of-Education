import { User } from "../models/user.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotfoundError } from "../error/errors.js";
import bcrypt from "bcrypt";
import {requestServiceUtil} from '../utils/serviceTypeUtil.js';
import { Roles } from "../models/roles.js";
import {RequestService} from '../models/requestService.js'
import { RequestIssue } from "../models/requestIssue.js";

//only adim can see all registered users
export const getAllUsers = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const users = await User.find({role : {$ne : Roles.Admin}}).select("-password -resetPasswordToken -resetPasswordExpires").skip(skip).limit(limit);

  res.status(StatusCodes.OK).json({ success: true, users, count: users.length, msg: "list of users" });
};

export const getUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select("-password -resetPasswordToken -resetPasswordExpires");
  if (!user)
    throw new NotfoundError(`No user with id : ${req.params.id} found.`);
  res.status(StatusCodes.OK).json({ success: true, user });
};
//only adim can register other users
export const register = async (req, res) => {
  const {password, confirmPassword} = req.body;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  
  if(!passwordRegex.test(password)) throw new BadRequestError("Password should contain at least one uppercase letter, one lowercase letter, one digit, and one special symbol. It should be at least 8 characters long.");

  if(password !== confirmPassword) throw new BadRequestError("password does not match.");
  const hashPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ ...req.body, password : hashPassword });
  // const token = user.jwtSign();
  res.status(StatusCodes.CREATED).json({ success: true, msg: "registerd" });
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


// CRud for the request service 

// the admin can add service 
export const addService = async (req, res) => {
    // add svice onec 
    // const services = await RequestService.insertMany(requestServiceUtil)
    // res.status(StatusCodes.CREATED).json({services})
    const { requestType, description } = req.body;
    // Find the service based on the requestType
    const service = await RequestService.findOne({requestType });
    if(!service) throw new NotfoundError(`service with request type ${requestType} not found`);
    
      //  append the new description to the existing service
      service.description = { ...service.description, ...description };
      await service.save();
      res.status(StatusCodes.OK).json({ success: true, service });
};


export const getServiceByRequestType = async(req,res) => {
  const {requestType} = req.params;
  const service = await RequestService.find({requestType});
  if(!service) throw new NotfoundError(`service with request type ${requestType} not found`);
  res.status(StatusCodes.OK).json({success: true, service});
}


export const deleteServiceByRequestStatus = async(req,res) => {
  const {requestType} = req.params;
  const service = await RequestService.findOneAndRemove({requestType});
  if(!service) throw new NotfoundError(`unable to delete service with service id ${id}`);
  res.status(StatusCodes.OK).json({success: true, msg : "Deleted Sucssfully"})
}