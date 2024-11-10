import { createSlice } from "@reduxjs/toolkit";
import { io, Socket } from "socket.io-client";
const initialState = {
  chatInfo: io("http://localhost:4000"),
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
      console.log(state);
      state.chatInfo.emit("sendMessage", {
        receiverId: payload.id,
        data: payload.data,
      });
    },
  },
});

export const { SocketConnection, userMessage } = SocketSlice.actions;

export default SocketSlice.reducer;
