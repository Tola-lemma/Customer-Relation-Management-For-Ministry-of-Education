import express from "express";
import multer from "multer";
import { upload, trackIssue } from "../controllers/issue.js";
import {storage} from "../utils/storage.js"
import {fileFilter, limits} from "../utils/fileFilter.js"

const router = express.Router();

const uploadM = multer({storage, fileFilter, limits})

router.post("/ticket-issue",  uploadM.array("files", limits.files), upload);
router.get("/track-issue", trackIssue);

export { router as requestIssueRouter };
