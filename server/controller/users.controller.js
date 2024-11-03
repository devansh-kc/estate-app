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

  let hashedPassword = null;

  try {
    if (password) {
      hashedPassword = await bcrypt.hash(password, 9);
    }
    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: {
        ...(username && { username: username }),
        ...(email && { email: email }),
        ...(hashedPassword && { password: hashedPassword }),
        ...(avatar && { avatar: avatar }),
      },
    });
    const { password: userPassword, ...rest } = updatedUser;

    return res.status(200).json({ rest });
  } catch (error) {
    console.log("error from user route", error);
    res.status(500).json({ message: "Failed to get users" });
  }
}

export async function deleteUser(req, res) {
  const id = req.params.id;
  const tokenId = req.userId;
  if (id !== tokenId) {
    return res.status(403).json({ message: "not authorized" });
  }
  try {
    await prisma.user.delete({
      where: id,
    });
    res.status(200).json({ message: "user deleted" });
  } catch (error) {
    console.log("error from user route", error);
    res.status(500).json({ message: "Failed to get users" });
  }
}
export async function getUsersId(req, res) {}

export async function savedPost(req, res) {
  const postId = req.body.postId;
  const tokenId = req.userId;
  try {
    const savedPost = await prisma.savedPosts.findUnique({
      where: {
        userId_postId: {
          userId: tokenId,
          postId,
        },
      },
    });
    if (savedPost) {
      await prisma.savedPosts.delete({
        where: {
          id: savedPost.id,
        },
      });
      return res.status(200).json({ message: "Post removed from saved post" });
    } else {
      const post = await prisma.savedPosts.create({
        data: {
          userId: tokenId,
          postId,
        },
      });
      return res.status(200).json({ post, message: "Post saved" });
    }
  } catch (error) {
    console.log("error from savedPost route", error);
    res.status(500).json({ message: "Failed to get users" });
  }
}

export async function profilePost(req, res) {
  try {
    // TODO: mereko auth middle ware  me se id fetch karni hai verify karna hai aur usko based on that id agar saved Post hai aur us specific person ki post hai toh fetch karni hai
    const userId = req.userId;
    const savedPost = await prisma.savedPosts.findMany({
      where: {
        userId: userId,
      },
      include: {
        post: true,
      },
    });

    return res.status(200).json({ savedPost });
  } catch (error) {
    console.log("error from profilePost route", error);
    return res.status(500).json({ message: "Failed to get users" });
  }
}
