import crypto from "crypto";
import path from "path";
import { GridFsStorage } from "multer-gridfs-storage";
import { BadRequestError } from "../error/errors.js";
import { RequestIssue } from "../models/requestIssue.js";

const randomNumberStart = parseInt(process.env.RANDOM_NUMBER_START, 10);
const randomNumberEnd = parseInt(process.env.RANDOM_NUMBER_END, 10);

export const storage = new GridFsStorage({
  url: process.env.MONGO_CONNECTION_STRING,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, async (err, buf) => {
        if (err) return reject(new BadRequestError(err.message));
        try {
          if (!req.requestIssue?.Id) {
            // If requestIssueId doesn't exist, create a new RequestIssue
            await createIssue(req, crypto.randomInt(randomNumberStart, randomNumberEnd + 1));
          }
          return resolve({
            filename: buf.toString("hex") + path.extname(file.originalname), // modify the file name using random hex string inorger to prevent file duplicate
            bucketName: "files", // Name of the MongoDB collection,
            metadata: {
              requestIssueId: req.requestIssue.Id, //add requestIssueId as metadata
              originalname: file.originalname,
            },
          });
        } catch (error) {
          reject(error);
        }
      });
    });
  },
});

const createIssue = async (req, ticketNumber) => {
  if (!req.body.name || !req.body.email || !req.body.issueDescription)
    throw new BadRequestError(
      "please provide name, email and issue descritpion for the requested isssue."
    );
  const requestIssue = await RequestIssue.create({ ...req.body, ticketNumber : ticketNumber });
  req.requestIssue = { Id: requestIssue._id, ticketNumber : requestIssue.ticketNumber };
};