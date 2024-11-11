import { io } from "socket.io-client";

export const socket = io("http://localhost:4000");

export const socketMiddleware = (store) => (next) => (action) => {
  if (action.type === "socket/userMessage") {
    socket.emit("sendMessage", {
      receiverId: action.payload.id,
      data: JSON.parse(action.payload.data),
    });
  }
  return next(action);
};
