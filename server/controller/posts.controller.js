import prisma from "../lib/prisma.js";

async function getPosts(req, res) {
  const { id } = req.params;
  if (id !== req.userId) {
    return res.status(40).json({ message: "Not authorized" });
  }

  try {
    const posts = await prisma.post.findMany({
      where: {
        UserId: id,
      },
    });
    return res.status(200).json(posts);
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
    res.status(200).json(post);
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
    res.status(200).json({ newPost, success: true });
  } catch (error) {
    console.log("error from Add  posts", error);
    res
      .status(500)
      .json({
        message: "something went wrong while fetching the user",
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
