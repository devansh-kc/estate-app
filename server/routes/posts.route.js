import express from "express";
import {
  AddPost,
  updatePost,
  DeletePost,
  getPosts,
} from "../controller/posts.controller.js";
const router = express.Router();
import { AuthenticationMiddleware } from "../middleware/auth.middleware.js";

router.get("/getPost", AuthenticationMiddleware, getPosts);
router.post("/AddPost", AddPost);
router.put("/updatePost", updatePost);
router.delete("/deletePost", DeletePost);
export default router;
