import express from "express";
import multer from "multer";
import { upload, trackIssue, getIssues } from "../controllers/issue.js";
import {storage} from "../utils/storage.js"
import {fileFilter, limits} from "../utils/fileFilter.js"
import { authMiddleware, isAuthorized } from "../middleware/auth.js";
import { Roles } from "../models/roles.js";

const router = express.Router();

const uploadM = multer({storage, fileFilter, limits})

router.post("/ticket-issue",  uploadM.array("files", limits.files), upload);
router.get("/track-issue", trackIssue);
router.get("/requested-issues", authMiddleware, isAuthorized(Roles.ComplaintsCoordinator, Roles.ScholarshipCoordinator, Roles.StudyAbroadCoordinator, Roles.TransferCoordinator), getIssues)

export { router as requestIssueRouter };
