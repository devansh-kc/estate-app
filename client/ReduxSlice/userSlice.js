import { createSlice } from "@reduxjs/toolkit";
const loadFromLocalStorage = (key) => {
  try {
    const serializedData = localStorage.getItem(key);
    if (serializedData === null) return null;
    return JSON.parse(serializedData);
  } catch (error) {
    console.error("Could not load data from localStorage", error);
    return null;
  }
};

const initialState = {
  userInfo: loadFromLocalStorage("userInformation") || null,
};

export const UserSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInformation", JSON.stringify(action.payload));
    },
    userLogOut: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem("userInformation");
    },
  },
});

export const { userLogin, userLogOut } = UserSlice.actions;
