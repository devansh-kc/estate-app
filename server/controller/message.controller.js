import prisma from "../lib/prisma.js";

export async function addMessage(req, res) {
  const { chatId } = req.params;
  const userId = req.userId;
  const { content } = req.body;

  try {
    const chat = await prisma.chat.findUnique({
      where: {
        id: chatId,
        userIds: {
          hasSome: [userId],
        },
      },
      include: {
        Message: true,
      },
    });
    if (!chat) {
      return res.status(404).json({ message: "chat not found" });
    }
    const message = await prisma.message.create({
      data: {
        message: content,
        chatId,
        userId,
      },
    });

    return res.status(200).json({ chat });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something went wrong while adding chat " });
  }
}
