import express from "express";
import {
  getUsers,
  getUsersId,
  deleteUser,
  updateUser,
} from "../controller/users.controller.js";

import { AuthenticationMiddleware } from "../middleware/auth.middleware.js";
const router = express.Router();
router.get("/", getUsers);
router.get("/:id",AuthenticationMiddleware, getUsersId);
router.patch("/:id",AuthenticationMiddleware, updateUser);
router.delete("/:id", deleteUser);

export default router;
