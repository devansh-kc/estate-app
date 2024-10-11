import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
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
} from "./routes/index.js";
import { Provider } from "react-redux";
import store from "../reduxStore/Store.js";
import AuthLayout from "./routes/layout/AuthLayout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <LoginPage />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <SignUp />
          </AuthLayout>
        ),
      },
      {
        path: "/",
        element: (
          <AuthLayout authentication={false}>
            <Homepage />{" "}
          </AuthLayout>
        ),
      },
      {
        path: "/list",
        element: (
          <AuthLayout authentication={false}>
            <ListPage />
          </AuthLayout>
        ),
      },
      {
        path: "/list/:id",
        element: (
          <AuthLayout authentication={false}>
            <SinglePage />
          </AuthLayout>
        ),
      },
      {
        path: "profile",

        element: (
          <AuthLayout authentication>
            <ProfilePage />
          </AuthLayout>
        ),
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
