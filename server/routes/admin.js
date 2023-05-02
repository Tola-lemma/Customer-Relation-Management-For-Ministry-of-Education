import express from "express";
import {
  register,
  getAllUsers,
  getUser,
  removeAccount,
  updateRole,
} from "../controllers/admin.js";

const router = express.Router();

router.get("/users", getAllUsers);
router.get("/user/:id", getUser)
router.post("/register", register);
router.post("/update-role/:id", updateRole);
router.delete("/delete-account/:id", removeAccount);

export { router as adminRoute };
