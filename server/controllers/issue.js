import { StatusCodes } from "http-status-codes";
import { RequestIssue } from "../models/requestIssue.js";
import { NotfoundError } from "../error/errors.js";
import { sendMail } from "../utils/sendmail.js";
import { requestNotificationMailOptions } from "../utils/mailOptions.js";
import {ServiceTypes} from "../models/serviceTypes.js";
import mongoose from "mongoose";

export const upload = async (req, res) => {
  res
    .status(StatusCodes.CREATED)
    .json({
      success: true,
      msg: "file uploaded successfully, please check your email to get your ticket number for the submitted issue.",
    });

  const requestIssue = await RequestIssue.findById(req.requestIssue.Id);

  if (!requestIssue)
    throw new NotfoundError(`No request issue with ${req.requestIssue.Id}.`);
  
  await sendMail(requestNotificationMailOptions(requestIssue.name, requestIssue.email,requestIssue._id));
};

export const trackIssue = async (req, res) => {
  const { ticket } = req.query;
  const requestedIssue = await RequestIssue.findById(ticket);
  if (!requestedIssue)
    throw new NotfoundError(`No issue is request using with ticket : ${ticket}`);

  res.status(StatusCodes.OK).json({ success: true, status: requestedIssue.status, requestedIssue });
};

export const getIssues = async (req, res) => {
  const {role} = req.user;
  const serviceType = ServiceTypes[role]
  const requestIssue = await RequestIssue.find({serviceType})
  const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName : "files"
  })
  const requestIssueIds = Object.values(requestIssue).map((requestIssue) => requestIssue._id)
  const file = await bucket.find({"metadata.requestIssueId" : {$in : requestIssueIds }}).toArray()

  res.status(StatusCodes.OK).json({count : requestIssue.length, serviceType, requestIssue, file})
  
}