import React, { useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const [open, setOpen] = useState(false);
  const userData = useSelector((state) => state.user.userInfo);
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
              <div className="notification">3</div>
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
