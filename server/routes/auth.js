import express from "express";
import { login, changePassword } from "../controllers/auth.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/change-password", authMiddleware, changePassword);

export { router as authRoute };
