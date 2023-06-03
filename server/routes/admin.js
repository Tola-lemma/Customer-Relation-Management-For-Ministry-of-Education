import express from "express";
import {
  register,
  getAllUsers,
  getUser,
  removeAccount,
  updateRole,
} from "../controllers/admin.js";
import { generateReport, getIssues } from "../controllers/issue.js";

const router = express.Router();

router.get("/users", getAllUsers);
router.get("/user/:id", getUser);
router.post("/register", register);
router.post("/update-role/:id", updateRole);
router.delete("/delete-account/:id", removeAccount);
router.get("/requested-issues",getIssues);
router.get("/report", generateReport)

export { router as adminRoute };
