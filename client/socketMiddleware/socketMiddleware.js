import { io } from "socket.io-client";

export const socket = io("http://localhost:4000");

export const socketMiddleware = ({ receiver, data }) => {
  if (socket.connected) {
    socket.emit("sendMessage", { receiverId: receiver, data });
  }
};
