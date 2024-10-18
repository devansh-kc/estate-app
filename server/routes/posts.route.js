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

router.use(AuthenticationMiddleware);

router.post("/", AddPost);
router.get("/:id", getPosts);
router.get("/:id", getPost);

router.put("/:id", updatePost);
router.delete("/:id", DeletePost);
export default router;
