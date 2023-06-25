import express from "express";
import multer from "multer";
import {
  upload,
  trackIssue,
  getIssues,
  getFile,
  streamFile,
  updateIssueStatus,
  getRequestedIssue,
  deleteIssue,
  generateReport,
  getAllService
} from "../controllers/issue.js";
import { storage } from "../utils/storage.js";
import { fileFilter, limits } from "../utils/fileFilter.js";
import { authMiddleware, isAuthorized } from "../middleware/auth.js";
import { Roles } from "../models/roles.js";
// import { verifyRecaptcha } from "../middleware/verifyRecaptcha.js";

const router = express.Router();

const uploadM = multer({ storage, fileFilter, limits });

router.post("/ticket-issue", uploadM.array("files", limits.files), upload);
router.post("/track-issue", trackIssue);
router.get(
  "/requested-issues",
  authMiddleware,
  isAuthorized(
    Roles.ComplaintsCoordinator,
    Roles.ScholarshipCoordinator,
    Roles.StudyAbroadCoordinator,
    Roles.TransferCoordinator
  ),
  getIssues
);
router.get(
  "/file/:filename",
  authMiddleware,
  isAuthorized(
    Roles.ComplaintsCoordinator,
    Roles.ScholarshipCoordinator,
    Roles.StudyAbroadCoordinator,
    Roles.TransferCoordinator
  ),
  getFile
);

router.get(
  "/stream/:filename",
  authMiddleware,
  isAuthorized(
    Roles.ComplaintsCoordinator,
    Roles.ScholarshipCoordinator,
    Roles.StudyAbroadCoordinator,
    Roles.TransferCoordinator
  ),
  streamFile
);

router.put(
  "/update/:requestIssueId",
  authMiddleware,
  isAuthorized(
    Roles.ComplaintsCoordinator,
    Roles.ScholarshipCoordinator,
    Roles.StudyAbroadCoordinator,
    Roles.TransferCoordinator
  ),
  updateIssueStatus
);

router.get(
  "/request-issue/:requestIssueId",
  authMiddleware,
  isAuthorized(
    Roles.ComplaintsCoordinator,
    Roles.ScholarshipCoordinator,
    Roles.StudyAbroadCoordinator,
    Roles.TransferCoordinator
  ),
  getRequestedIssue
);

// router.delete(
//   "/delete-issue/:requestIssueId",
//   authMiddleware,
//   isAuthorized(
//     Roles.ComplaintsCoordinator,
//     Roles.ScholarshipCoordinator,
//     Roles.StudyAbroadCoordinator,
//     Roles.TransferCoordinator,
//   ),
//   deleteIssue
// );

router.get(
  "/report",
  authMiddleware,
  isAuthorized(
    Roles.ComplaintsCoordinator,
    Roles.ScholarshipCoordinator,
    Roles.StudyAbroadCoordinator,
    Roles.TransferCoordinator
  ),
  generateReport
);
router.get("/service", getAllService)

export { router as requestIssueRouter };
