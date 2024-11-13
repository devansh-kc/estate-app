import express from "express";
import {
  getUsers,
  // getUsersId,
  deleteUser,
  updateUser,
  savedPost,
  notificationCount,
} from "../controller/users.controller.js";
import { profilePost } from "../controller/users.controller.js";

import { AuthenticationMiddleware } from "../middleware/auth.middleware.js";
const router = express.Router();
router.get("/", getUsers);
// router.get("/:id", AuthenticationMiddleware, getUsersId);
router.patch("/:id", AuthenticationMiddleware, updateUser);
router.delete("/:id", deleteUser);
router.post("/save", AuthenticationMiddleware, savedPost);
router.get("/profilePosts", AuthenticationMiddleware, profilePost);
router.get("/notificationCount", AuthenticationMiddleware, notificationCount);

export default router;
