import express from "express";
import {
  AddPost,
  updatePost,
  DeletePost,
  getPosts,
} from "../controller/posts.controller.js";
const router = express.Router();

router.get("/getPost", getPosts);
router.post("/AddPost", AddPost);
router.put("/updatePost", updatePost);
router.delete("/deletePost", DeletePost);
export default router;
