import { configureStore } from "@reduxjs/toolkit";
import { UserSlice } from "../ReduxSlice/userSlice";
import { SocketSlice } from "../ReduxSlice/socketSlice";
const store = configureStore({
  reducer: {
    user: UserSlice.reducer,
    socket: SocketSlice.reducer,
  },
});

export default store;
