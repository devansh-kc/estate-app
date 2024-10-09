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
  SignUp
} from "./routes/index.js";
import { Provider } from "react-redux";
import store from "../reduxStore/Store.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/login", element: <LoginPage /> },
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
      },
      {
        path: "profile",
        element: <ProfilePage />,
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
