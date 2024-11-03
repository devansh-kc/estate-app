import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

async function getPosts(req, res) {
  const query = req.query;

  try {
    const posts = await prisma.post.findMany({
      where: {
        city: query.city || undefined,
        type: query.type || undefined,
        property: query.property || undefined,
        bedroom: parseInt(query.bedroom) || undefined,
        price: {
          gte: parseInt(query.minPrice) || 0,
          lte: parseInt(query.maxPrice) || 1000000,
        },
      },
    });

    return res.status(200).json({ posts });
  } catch (error) {
    console.log("error from get posts", error);
    res
      .status(500)
      .json({ message: "something went wrong while fetching the user" });
  }
}
async function updatePost(req, res) {
  try {
  } catch (error) {
    console.log("error from Update posts", error);
    res
      .status(500)
      .json({ message: "something went wrong while fetching the user" });
  }
}
async function getPost(req, res) {
  const id = req.params.id;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
        PostDetails: true,
      },
    });

    let userId;
    const token = req.cookies?.cookie;
    if (!token) {
      userId = null;
    } else {
      jwt.verify(token, process.env.JWT_SECRET_KEY, async (error, payload) => {
        if (error) {
          userId = null;
        } else {
          userId = payload.id;
        }
      });
    }
    const saved = await prisma.savedPosts.findUnique({
      where: {
        userId_postId: {
          postId: id,
          userId: userId,
        },
      },
    });
    return res.status(200).json({ ...post, isSaved: saved ? true : false });
  } catch (error) {
    console.log("error ", error);
    res
      .status(500)
      .json({ message: "something went wrong while fetching the user" });
  }
}
async function AddPost(req, res) {
  const body = req.body;
  const token = req.userId;

  for (const [key, value] of Object.entries(body.postData)) {
    if (value === null || value === undefined || value === "") {
      return res.status(400).json({
        message: `Please fill all the ${key} fields before clicking the add button`,
        success: false,
      });
    }
  }
  for (const [key, value] of Object.entries(body.PostDetails)) {
    if (value === null || value === undefined || value === "") {
      return res.status(400).json({
        message: `Please fill  the ${key} field before clicking the add button`,
        success: false,
      });
    }
  }
  try {
    const newPost = await prisma.post.create({
      data: {
        ...body.postData,
        UserId: token,
        PostDetails: {
          create: body.PostDetails,
        },
      },
    });
    return res.status(200).json({ newPost });
  } catch (error) {
    console.log("error from Add  posts", error);
    res.status(500).json({
      message: "something went wrong while creating post",
      success: false,
    });
  }
}

async function DeletePost(req, res) {
  const { id } = req.params;
  const existingPost = await prisma.post.findUnique({
    where: { id },
  });
  if (!existingPost) {
    return res.status(404).json({ message: "the post doesn't exists" });
  }

  if (req.userId !== existingPost.UserId) {
    return res.status(401).json("You are not the owner of the post");
  }

  try {
    await prisma.post.delete({ where: { id } });
    return res.status(200).json({ message: "Post is deleted" });
  } catch (error) {
    console.log("error from Delete  posts", error);
    res
      .status(500)
      .json({ message: "something went wrong while fetching the user" });
  }
}

export { getPosts, updatePost, AddPost, DeletePost, getPost };
