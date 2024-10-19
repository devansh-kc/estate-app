import express from "express";
import {
  AddPost,
  updatePost,
  DeletePost,
  getPost,
  getPosts,
} from "../controller/posts.controller.js";
const router = express.Router();
import { AuthenticationMiddleware } from "../middleware/auth.middleware.js";

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", AuthenticationMiddleware, AddPost);

router.put("/:id", AuthenticationMiddleware, updatePost);
router.delete("/:id", AuthenticationMiddleware, DeletePost);
export default router;
