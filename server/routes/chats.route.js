import express from "express";
import { AuthenticationMiddleware } from "../middleware/auth.middleware.js";
import {
  getChats,
  getSingleChat,
  addChat,
  readChat,
} from "../controller/chat.controller.js";

const router = express.Router();
router.use(AuthenticationMiddleware);

router.get("/", getChats);
router.get("/:id", getSingleChat);
router.post("/", addChat);
router.patch("/read", readChat);

export default router;
