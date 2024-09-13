import bcrypt from "bcryptjs";
import prisma from "../lib/prisma.js";
async function login(req, res) {
  res.send("login page");
}
async function logout(params) {}
async function register(req, res) {
  const { username, email, password } = req.body;
  if (username && email && password === " ") {
    return res.status(400).json("we need all the para meters");
  }
  const hashedPassword = await bcrypt.hash(password, 9);
  const newUser = await prisma.user.create({
    data: {
      username,
      email,
      password:hashedPassword,
    },
  });
  console.log(newUser)

  return res.status(200).json(newUser);
}

export { login, logout, register };
