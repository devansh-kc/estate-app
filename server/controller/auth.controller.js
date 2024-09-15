import bcrypt from "bcryptjs";
import prisma from "../lib/prisma.js";
async function login(req, res) {
  const {  email, password } = req.body;
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
      return res.status(404).json("user didn't exist");
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "the password is not correct" });
    }
    res.setHeader("Set-Cookie", "welcome" + user.username + " " + user.id);
    return res.status(200).json({ message: "Welcome back", user });
  } catch (error) {
    return res.status(500).json({ message: "error from login", error });
  }
}
async function logout(params) {}
async function register(req, res) {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json("please enter the required details");
  }

  const hashedPassword = await bcrypt.hash(password, 9);

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
