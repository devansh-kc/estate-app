import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { UserSlice } from "../ReduxSlice/userSlice";
import { SocketSlice } from "../ReduxSlice/socketSlice";
import { socketMiddleware } from "../socketMiddleware/socketMiddleware";

const store = configureStore({
  reducer: {
    user: UserSlice.reducer,
    socket: SocketSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware),
});

export default store;
