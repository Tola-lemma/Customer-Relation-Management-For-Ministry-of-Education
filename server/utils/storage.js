import crypto from "crypto";
import path from "path";
import { GridFsStorage } from "multer-gridfs-storage";
import { BadRequestError } from "../error/errors.js";
import { RequestIssue } from "../models/requestIssue.js";

export const storage = new GridFsStorage({
  url: process.env.MONGO_CONNECTION_STRING,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, async (err, buf) => {
        if (err) return reject(new BadRequestError(err.message));
        await createIssue(req);
        
        return resolve({
          filename: buf.toString("hex") + path.extname(file.originalname), // modify the file name using random hex string inorger to prevent file duplicate
          bucketName: "files", // Name of the MongoDB collection,
          metadata: {
            requestIssueId: req.requestIssue.Id,
            originalname: file.originalname,
          }, ////add requestIssue as metadata
        });
      });
    });
  },
});

const createIssue = async (req) => {
  try {
    if (!req.body.name || !req.body.email || !req.body.issueDescription)
      throw new BadRequestError(
        "please provide name, email and issue descritpion for the requested isssue."
      );
    const reqestIssue = await RequestIssue.create({ ...req.body });
    req.requestIssue = { Id: reqestIssue._id };
  } catch (error) {
    throw new Error(error.message);
  }
};
