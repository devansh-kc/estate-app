import express from "express";
import { AuthenticationMiddleware } from "../middleware/auth.middleware.js";
import { addMessage } from "../controller/message.controller.js";
const router = express.Router();
router.use(AuthenticationMiddleware);
router.post("/:chatId", addMessage);

export default router;
