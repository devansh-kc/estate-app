import { createSlice } from "@reduxjs/toolkit";
import { io, Socket } from "socket.io-client";
import { socket } from "../socketMiddleware/socketMiddleware";
const initialState = {
  chatInfo: socket,
};

export const SocketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    SocketConnection: (state) => {
      if (!initialState.chatInfo.connected) {
        state.chatInfo = io("http://localhost:4000");
      }
    },
    userMessage: (state, payload) => {
    },
  },
});

export const { SocketConnection, userMessage } = SocketSlice.actions;

export default SocketSlice.reducer;
