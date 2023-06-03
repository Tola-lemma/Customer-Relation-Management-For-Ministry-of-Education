import { StatusCodes } from "http-status-codes";
import { RequestIssue } from "../models/requestIssue.js";
import { BadRequestError, NotfoundError } from "../error/errors.js";
import { sendMail } from "../utils/sendmail.js";
import {
  requestDoneNotificationMailOptions,
  requestNotificationMailOptions,
} from "../utils/mailOptions.js";
import { ServiceTypes } from "../models/serviceTypes.js";
import mongoose from "mongoose";
import { IssueStatus } from "../models/issueStatus.js";
import { Roles } from "../models/roles.js";

export const upload = async (req, res) => {

  const requestIssue = await RequestIssue.findById(req.requestIssue.Id);
  
  if (!requestIssue)
  throw new NotfoundError(`No request issue with ${req.requestIssue.Id}.`);
  
  await sendMail(
    requestNotificationMailOptions(
      requestIssue.name,
      requestIssue.email,
      requestIssue._id
    ));

  res.status(StatusCodes.CREATED).json({
    success: true,
    msg: "file uploaded successfully, please check your email to get your ticket number for the submitted issue.",
  });
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
  const serviceType = role === Roles.Admin ? {} : ServiceTypes[role];
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
    {$skip : skip},
    {$limit : limit}
  ])

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

  res
    .status(StatusCodes.OK)
    .json({ success: true, requestedIssue });
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

  const issueToUpdate = await RequestIssue.findOne({ _id: requestIssueId, serviceType: serviceType });
    
  if (!issueToUpdate) throw new NotfoundError(`No Issue with id : ${requestIssueId} found.`);

  const currentIssueStatus = issueToUpdate.issueStatus
  const newStatus = IssueStatus[status]
  
  if(currentIssueStatus === newStatus) throw new BadRequestError("Can't update the same status")

  issueToUpdate.issueStatus = newStatus
  await issueToUpdate.save()
 
  
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

res.status(StatusCodes.OK).json({
  success: true,
  msg: "issue status updated successfully.",
  issueToUpdate,
});

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

export const generateReport = async (req, res) => {
  const {startDate, endDate} = req.query
  const serviceType = req.user.role === Roles.Admin ? {} : ServiceTypes[req.user.role];

  const dateMatch = {}
  if (startDate && endDate){
    dateMatch = {
      $match: {
        createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
      },
    };
  }
  
  const aggregateReport = await RequestIssue.aggregate([
    dateMatch,
    { $match: { serviceType } },
    {
      $lookup: {
        from: "files.files",
        localField: "_id",
        foreignField: "metadata.requestIssueId",
        as: "files",
      },
    },
    {
      $group: {
        _id: {
          serviceType: "$serviceType",
          issueStatus: "$issueStatus",
        },
        count: { $sum: 1 },
        totalFiles: { $sum: { $size: "$files" } },
        totalFileLength: { $sum: { $sum: "$files.length" } },
        createdAt: { $min: "$createdAt" },
        updatedAt: { $max: "$updatedAt" },
        issueDescriptions: { $addToSet: "$issueDescription" },
        resolvedIssues: {
          $push: {
            $cond: [{ $eq: ["$issueStatus", "done"] }, { $subtract: ["$updatedAt", "$createdAt"] }, null],
          },
        },
      },
    },
    {
      $group: {
        _id: "$_id.serviceType",
        count: { $sum: "$count" },
        totalFiles: { $sum: "$totalFiles" },
        totalFileLength: { $sum: "$totalFileLength" },
        issueStatus: {
          $push: {
            status: "$_id.issueStatus",
            count: "$count",
          },
        },
        averageFileLength: { $avg: "$totalFileLength" },
        minFileLength: { $min: "$totalFileLength" },
        maxFileLength: { $max: "$totalFileLength" },
        resolvedIssues: { $push: "$resolvedIssues"  },
        averageIssueResolutionTime: {
          $avg: {
            $cond: [{ $ne: ["$resolvedIssues", null] }, { $avg: "$resolvedIssues" }, null],
          },
        },
        mostCommonIssueDescriptions: { $first: "$issueDescriptions" },
      },
    },
    {
      $project: {
        serviceType: "$_id",
        _id: 0,
        count: 1,
        totalFiles: 1,
        totalFileLength: 1,
        issueStatus: 1,
        averageFileLength: 1,
        minFileLength: 1,
        maxFileLength: 1,
        averageIssueResolutionTime: 1,
        mostCommonIssueDescriptions: 1,
      },
    },
  ]);
  
  res.status(StatusCodes.OK).json({ success: true, aggregateReport });
};
