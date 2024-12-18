import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import postRoute from "./routes/posts.route.js";
import userRoute from "./routes/user.route.js";
import chatRoute from "./routes/chats.route.js"
import messageRoute from "./routes/message.route.js"

import cors from "cors";
const app = express();

app.use(cookieParser());
app.listen(8000, () => {
  console.log("server has started");
});

app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use("/api/auth", authRouter);
app.use("/api/posts", postRoute);
app.use("/api/user", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/message", messageRoute);
