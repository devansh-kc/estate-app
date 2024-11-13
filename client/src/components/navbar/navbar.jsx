import React, { useState } from "react";
import "./navbar.scss";
import { Link, useLoaderData } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { apiRequest } from "../../apiRequest/apiRequest";
import { totalNotification } from "../../../ReduxSlice/userSlice";

function Navbar() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userInfo);
  const userNotification = useSelector((state) => state.user.userNotification);
  const notificationLoader = async () => {
    const notificationPromise = await apiRequest.get(`user/notificationCount`);
    dispatch(totalNotification(notificationPromise.data.notification));
  };
  notificationLoader();
  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <img src="/logo.png" alt="logo" />
          <span>Real Estate App</span>
        </a>
        <a href="/">home</a>
        <a href="/">about</a>
        <a href="/">contact</a>
        <a href="/">agents</a>
      </div>
      <div className="right">
        {userData ? (
          <div className="user">
            <img
              src={
                userData.avatar ||
                "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
              }
              alt={userData.username}
            />
            <span>{userData.username}</span>
            <Link to="/profile" className="profile">
              {userNotification > 0 && (
                <div className="notification">{userNotification}</div>
              )}
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <Link to="/login">Sign In</Link>
            <Link to="/signup" className="register">
              Sign Up
            </Link>
          </>
        )}

        <div className="menuIcon" onClick={() => setOpen((prev) => !prev)}>
          <img src="/menu.png" alt="" />
        </div>

        <div className={open ? "menu active" : "menu"}>
          <a href="/">home</a>
          <a href="/">about</a>
          <a href="/">contact</a>
          <a href="/">agents</a>
          <Link to="/login">Sign In</Link>
          <Link href="/signup">Sign Up</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
