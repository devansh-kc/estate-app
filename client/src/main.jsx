import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  LoginPage,
  Homepage,
  ListPage,
  Layout,
  SinglePage,
  ProfilePage,
  SignUp,
  RequireAuth,
} from "./routes/index.js";
import { Provider } from "react-redux";
import store from "../reduxStore/Store.js";
import UpdateProfilePage from "./routes/profileUpdate/UpdateProfilePage.jsx";
import NewPostPage from "./routes/new Posts Page/NewPostPage.jsx";
import { singlePageLoader } from "./loader/SinglePageLoader.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/list",
        element: <ListPage />,
      },
      {
        path: "/list/:id",
        element: <SinglePage />,
        loader: singlePageLoader,
      },
      {
        path: "/newPost",
        element: <NewPostPage />,
      },
    ],
  },
  {
    path: "/",
    element: <RequireAuth />,
    children: [
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/updateProfile",
        element: <UpdateProfilePage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
