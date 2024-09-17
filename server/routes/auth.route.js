import express from "express";
const router = express.Router();
import { AuthenticationMiddleware } from "../middleware/auth.middleware.js";
import { login, logout, register } from "../controller/auth.controller.js";

router.post("/login", login);
router.post("/logout", logout);
router.post("/register", register);

export default router;
