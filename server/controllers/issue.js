import { StatusCodes } from "http-status-codes";
import { RequestIssue } from "../models/requestIssue.js";
import { BadRequestError, NotfoundError } from "../error/errors.js";
import { sendMail } from "../utils/sendmail.js";
import {
  requestDoneNotificationMailOptions,
  requestNotificationMailOptions,
} from "../utils/mailOptions.js";
import { ServiceTypes } from "../models/serviceTypes.js";
import mongoose, { mongo, ObjectId } from "mongoose";
import { IssueStatus } from "../models/issueStatus.js";

export const upload = async (req, res) => {
  res.status(StatusCodes.CREATED).json({
    success: true,
    msg: "file uploaded successfully, please check your email to get your ticket number for the submitted issue.",
  });

  const requestIssue = await RequestIssue.findById(req.requestIssue.Id);

  if (!requestIssue)
    throw new NotfoundError(`No request issue with ${req.requestIssue.Id}.`);

  await sendMail(
    requestNotificationMailOptions(
      requestIssue.name,
      requestIssue.email,
      requestIssue._id
    )
  );
};

export const trackIssue = async (req, res) => {
  const { ticket } = req.query;
  const requestedIssue = await RequestIssue.findById(ticket);
  if (!requestedIssue)
    throw new NotfoundError(
      `No issue is request using with ticket : ${ticket}`
    );

  res
    .status(StatusCodes.OK)
    .json({ success: true, status: requestedIssue.status, requestedIssue });
};

export const getIssues = async (req, res) => {
  const { role } = req.user;
  const serviceType = ServiceTypes[role];
  //pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  //aggregate query to get the issue that matched with the given servie type
  const requestedIssues = await RequestIssue.aggregate([
    { $match: { serviceType } },
    { $sort: { createdAt: -1 } },
    {
      $lookup: {
        from: "files.files",
        localField: "_id",
        foreignField: "metadata.requestIssueId",
        as: "files",
      },
    },
  ])
    .skip(skip)
    .limit(limit);

  res
    .status(StatusCodes.OK)
    .json({ count: requestedIssues.length, requestedIssues });
};

export const getRequestedIssue = async (req, res) => {
  const { requestIssueId } = req.params;
  const serviceType = ServiceTypes[req.user.role];

  const requestedIssue = await RequestIssue.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(requestIssueId),
        serviceType: serviceType,
      },
    },
    {
      $lookup: {
        from: "files.files",
        localField: "_id",
        foreignField: "metadata.requestIssueId",
        as: "files",
      },
    },
  ]);

  if (!requestedIssue.length)
    throw new NotfoundError(`No requestIssue with id ${requestIssueId} found.`);

  res.status(StatusCodes.OK).json({ success: true, requestedIssue });
};

export const getFile = async (req, res) => {
  const { filename } = req.params;

  if (!filename) throw new BadRequestError("file is required.");

  // Create a new GridFSBucket instance
  const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "files",
  });

  // find a file that with filename from the bucket
  const file = await bucket.find({ filename }).toArray();

  if (file.length == 0)
    throw new NotfoundError(`No file with : ${filename} exist`);

  res.status(StatusCodes.OK).json({ success: true, file });
};

export const streamFile = async (req, res) => {
  const { filename } = req.params;
  if (!filename) throw new BadRequestError("file is required.");

  // Create a new GridFSBucket instance
  const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "files",
  });

  const fileToStream = await bucket.find({ filename }).toArray();

  if (!fileToStream.length) throw new NotfoundError(`file not found.`);

  // find a file that with filename from the bucket
  const downloadStream = bucket.openDownloadStreamByName(filename);
  // Pipe the download stream to the response object to send the file
  downloadStream.pipe(res);
};

export const updateIssueStatus = async (req, res) => {
  const { status } = req.body;
  const { requestIssueId } = req.params;
  const serviceType = ServiceTypes[req.user.role];

  if (!status)
    throw new BadRequestError(
      "please provide a complete information, status is requred."
    );

  if (!IssueStatus[status])
    throw new BadRequestError("Invalid value for issue status.");

  const issueToUpdate = await RequestIssue.findOne({
    _id: requestIssueId,
    serviceType: serviceType,
  });

  if (!issueToUpdate)
    throw new NotfoundError(`No Issue with id : ${requestIssueId} found.`);

  const currentIssueStatus = issueToUpdate.issueStatus;
  const newStatus = IssueStatus[status];

  if (currentIssueStatus === newStatus)
    throw new BadRequestError("Can't update the same status");

  issueToUpdate.issueStatus = newStatus;
  await issueToUpdate.save();

  res.status(StatusCodes.OK).json({
    success: true,
    msg: "issue status updated successfully.",
    issueToUpdate,
  });

  if (issueToUpdate.issueStatus === IssueStatus.done) {
    await sendMail(
      requestDoneNotificationMailOptions(
        issueToUpdate.name,
        issueToUpdate.email,
        requestIssueId
      )
    );
  }
};

export const deleteIssue = async (req, res) => {
  const { requestIssueId } = req.params;
  const serviceType = ServiceTypes[req.user.role];

  if (!requestIssueId)
    throw new BadRequestError(
      "please provide a complete information, request issue id is requred."
    );

  const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "files",
  });

  const filesToDelete = await bucket
    .find({
      "metadata.requestIssueId": new mongoose.Types.ObjectId(requestIssueId),
    })
    .toArray();

  if (!filesToDelete.length)
    throw new BadRequestError(
      `No issue with request id ${requestIssueId} exists.`
    );

  const fileIds = Object.values(filesToDelete).map((file) => file._id);

  // Delete the files and their associated chunks
  const confirmFiles = await mongoose.connection.db
    .collection("files.files")
    .deleteMany({ _id: { $in: fileIds } });

  const confirmChunks = await mongoose.connection.db
    .collection("files.chunks")
    .deleteMany({ files_id: { $in: fileIds } });

  if (!confirmFiles.acknowledged || !confirmChunks.acknowledged)
    throw new BadRequestError(
      "Error while deleteing the files and it's chunks"
    );

  const requestedIssue = await RequestIssue.findOneAndDelete({
    _id: requestIssueId,
    serviceType: serviceType,
  });

  if (!requestedIssue)
    throw new NotfoundError(`No requestIssue found with id ${requestIssueId}.`);

  res.status(StatusCodes.OK).json({
    success: true,
    msg: `${confirmFiles.deletedCount} files and ${confirmChunks.deletedCount} chunks deleted successfully.`,
  });
};