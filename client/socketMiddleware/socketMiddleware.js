import { io } from "socket.io-client";

export const socket = io("http://localhost:4000");

export const socketMiddleware = (receiverid, data) => {
  if (socket.connected) {
    socket.emit("sendMessage", {
      receiverid: receiverid,
      data,
    });
  }
};
