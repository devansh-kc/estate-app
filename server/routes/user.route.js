import express from "express";
import {
  getUsers,
  getUsersId,
  deleteUser,
  updateUser,
} from "../controller/users.controller.js";

import { AuthenticationMiddleware } from "../middleware/auth.middleware.js";
const router = express.Router();
router.use(AuthenticationMiddleware);

router.get("/", getUsers);
router.get("/:id", getUsersId);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
