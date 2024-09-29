import React, { useState } from "react";
import "./navbar.scss";

function Navbar() {
  const [open, setOpen] = useState(false);
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
        <a href="/">Sign In</a>
        <a href="/" className="register">
          Sign Up
        </a>

        <div className="menuIcon" onClick={() => setOpen((prev) => !prev)}>
          <img src="/menu.png" alt="" />
        </div>

        <div className={open ? "menu active" : "menu"}>
          <a href="/">home</a>
          <a href="/">about</a>
          <a href="/">contact</a>
          <a href="/">agents</a>
          <a href="/">Sign In</a>
          <a href="/">Sign Up</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
