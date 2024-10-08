import React from "react";
import { Link } from "react-router-dom";
import "./loginpage.scss"
function LoginPage() {
  return (
    <div className="login">
      <div className="formContainer">
        <form >
          <h1>Welcome back</h1>
          <input
            name="username"
            required
            minLength={3}
            maxLength={20}
            type="text"
            placeholder="Username"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
          />
          <button >Login</button>
          {/* {error && <span>{error}</span>} */}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default LoginPage;
