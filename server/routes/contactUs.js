import express from "express";
import { contactUs } from "../controllers/contactUs.js";
import { verifyRecaptcha } from "../middleware/verifyRecaptcha.js";

const router = express.Router();
router.post("/", verifyRecaptcha, contactUs)

export {router as contactRouter}
