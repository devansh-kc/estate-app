import { Server } from "socket.io";
const io = new Server({
  cors: {
    origin: "http://localhost:5173",
  },
});

let onlineUser = [];
const addUser = (userId, socketId) => {
  const existingUser = onlineUser.find((user) => user.userId === userId);
  if (!existingUser) {
    onlineUser.push({ userId, socketId });
  }
};
const deleteUser = (socketId) => {
  onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
};
const getUser = (userId) => {
  return onlineUser.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
  });
  socket.on("disconnect", () => {
    deleteUser(socket.id);
  });
  socket.on("sendMessage", (receiverid) => {
    const receiver = getUser(receiverid.receiverid);
    if (!receiver) {
      addUser(receiverid.data, socket.id);
      io.to(onlineUser.socketId).emit("getMessage", onlineUser.userId);
    }
  });
});

io.listen("4000", () => {
  console.log("Socket Server connected");
});
