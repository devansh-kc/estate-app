import express from "express";
import authRouter from "./routes/auth.route.js";
import postRoute from "./routes/posts.route.js";
import userRoute from "./routes/user.route.js";
const app = express();
app.listen(8000, () => {
  console.log("server has started");
});

app.use(express.json())
app.use("/api/auth", authRouter);
app.use("/api/posts", postRoute);
app.use("/api/user", userRoute);
