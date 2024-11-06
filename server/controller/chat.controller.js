import prisma from "../lib/prisma.js";

export async function getChats(req, res) {
  const userToken = req.userId;
  if (!userToken) {
    return res.status(401).json({
      message:
        "failed to get userToken try to login first before using chat functionality",
    });
  }

  try {
    const chat = await prisma.chat.findMany({
      where: {
        userIds: {
          hasSome: [userToken],
        },
      },
    });

    for (const userIdFromChat of chat) {
      const receiverId = userIdFromChat.userIds.find((id) => id !== userToken);
      const receiverDetails = await prisma.user.findUnique({
        where: {
          id: receiverId,
        },
        select: {
          id: true,
          avatar: true,
          username: true,
        },
      });
      userIdFromChat.receiver = receiverDetails;
    }
    return res.status(200).json({ chat });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "failed to get chat" });
  }
}
export async function getSingleChat(req, res) {
  const { id } = req.params;
  const userId = req.userId;
  try {
    const chat = await prisma.chat.findUnique({
      where: {
        id: id,
      },
      include: {
        Message: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });
    await prisma.chat.update({
      where: {
        id: id,
      },
      data: {
        seenBy: {
          push: [userId],
        },
      },
    });
    const LoggedInUser = chat.userIds[0];
    if (LoggedInUser !== userId) {
      return res.status(401).json({
        message:
          "This chat is not generated by you please try to login with the correct gmail id ",
      });
    }

    return res.status(200).json({ chat });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "failed to get  single chat" });
  }
}

export async function addChat(req, res) {
  const userId = req.userId;
  const { receiverId } = req.body;

  try {
    const newChat = await prisma.chat.create({
      data: {
        userIds: [userId, receiverId],
      },
    });
    return res.status(200).json({ newChat });
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json({ message: "Something went wrong while adding chat " });
  }
}

export async function readChat(req, res) {
  const userId = req.userId;

  try {
    const chat = await prisma.chat.update({
      where: {
        id: userId,
        userIds: {
          hasSome: [userId],
        },
      },
      data: {
        seenBy: {
          push: [userId],
        },
      },
    });
    // const LoggedInUser = chat.userIds[0];
    // if (LoggedInUser !== userId) {
    //   return res.status(401).json({
    //     message:
    //       "This chat is not generated by you please try to login with the correct gmail id ",
    //   });
    // }

    return res.status(200).json({ chat });
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json({ message: "Something went wrong while adding chat " });
  }
}
