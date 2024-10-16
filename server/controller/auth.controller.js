import bcrypt from "bcryptjs";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

async function login(req, res) {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    if (!email) {
      return res.status(400).json("please enter the email or password");
    }
    if (!password) {
      return res.status(400).json("please enter the password");
    }
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res
        .status(404)
        .json({ message: "user didn't exist", success: false });
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "the password is not correct" });
    }
    const age = 1000 * 60 * 60 * 24 * 7;
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: age,
    });
    const { password: userPassword, ...userInfo } = user;

    res.cookie("cookie", token, {
      httpOnly: true,
      maxAge: age,
      sameSite: "none",
      secure: process.env.NODE_ENV === "production", // Add this to use secure flag only in production
    });
    return res.status(200).json({ userInfo, success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "error from login", error, success: false });
  }
}
async function logout(req, res) {
  res.clearCookie("token").status(200).json({ message: "LogOut SuccessFul" });
}
async function register(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json("please enter the required details");
  }
  const avatarPath = req.files?.avatar[0]?.path;

  const hashedPassword = await bcrypt.hash(password, 9);
  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    return res.status(401).json({
      message: "this user already exists please use another email or username",
      success: false,
    });
  }
  try {
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    return res.status(200).json(newUser);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export { login, logout, register };
