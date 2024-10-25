import prisma from "../lib/prisma.js";

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
    console.log(posts);
    setTimeout(() => {
      return res.status(200).json({ posts });
    }, 3000);
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
    res.status(500).json({
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
