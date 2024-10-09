import { createSlice } from "@reduxjs/toolkit";

const initialState = { userInfo: null };

export const UserSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInformation", JSON.parse(action.payload));
    },
    userLogOut: (state, action) => {
      state.userInfo = null;
    },
  },
});

export const { userLogin, userLogOut } = UserSlice.actions;
