import express from "express";
import { login, changePassword, forgetPassword, resetPassword, getResetPassword } from "../controllers/auth.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/change-password", authMiddleware, changePassword);
router.post("/forget-password", forgetPassword)
router.post("/reset-password/:token", resetPassword)
router.get("/reset-password/:token/:userId", getResetPassword)

export { router as authRoute };
