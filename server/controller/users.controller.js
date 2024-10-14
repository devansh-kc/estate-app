import prisma from "../lib/prisma.js";
import bcrypt from "bcryptjs";

export async function getUsers(req, res) {
  try {
    const users = await prisma.user.findMany();
    return res.status(200).json({ message: users });
  } catch (error) {
    console.log("error from user route", error);
    return res.status(500).json({ message: "Failed to get users" });
  }
}
export async function updateUser(req, res) {
  const id = req.params.id;
  const tokenId = req.userId;
  const { username, email, password, avatar } = req.body;
  if (id !== tokenId) {
    return res.status(403).json({ message: "not authorized" });
  }
  const hashedPassoword = null;
  try {
    hashedPassoword = bcrypt.hashSync(password, 9);
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...(username && { username: username }),
        ...(email && { email: email }),
        ...(hashedPassoword && { password: hashedPassoword }),
        
      },
    });
    return res.status(200).json({ message: updatedUser });
  } catch (error) {
    console.log("error from user route", error);
    res.status(500).json({ message: "Failed to get users" });
  }
}

export async function deleteUser(req, res) {
  try {
  } catch (error) {
    console.log("error from user route", error);
    res.status(500).json({ message: "Failed to get users" });
  }
}
export async function getUsersId(req, res) {
  try {
  } catch (error) {
    console.log("error from user route", error);
    res.status(500).json({ message: "Failed to get users" });
  }
}
