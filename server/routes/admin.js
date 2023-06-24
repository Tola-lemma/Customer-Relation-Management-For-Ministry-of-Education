import express from "express";
import {
  register,
  getAllUsers,
  getUser,
  removeAccount,
  updateRole,
  addService,
  getServiceByRequestType,
  deleteServiceByRequestStatus
} from "../controllers/admin.js";
import { deleteIssue, generateReport, getIssues } from "../controllers/issue.js";
import { changePassword, updateAccount } from "../controllers/auth.js";

const router = express.Router();

router.get("/users", getAllUsers);
router.get("/user/:id", getUser);
router.post("/register", register);
router.put("/update-role/:id", updateRole);
router.delete("/delete-account/:id", removeAccount);
router.get("/requested-issues",getIssues);
router.get("/report", generateReport)
router.put("/update-account", updateAccount)
router.put("/change-password", changePassword)
router.delete("/delete/:requestIssueId", deleteIssue)

router.post("/add-service", addService)
router.get("/service/:requestType", getServiceByRequestType)
router.delete("/service/:requestType", deleteServiceByRequestStatus)
export { router as adminRoute };
