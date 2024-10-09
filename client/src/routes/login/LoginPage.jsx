import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./loginpage.scss";
import { useDispatch } from "react-redux";
import { userLogin } from "../../../ReduxSlice/userSlice";
import axios from "axios";
function LoginPage() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  async function handleSubmit(e) {
    e.preventDefault();
    const userInformation = {
      email: email,
      password: password,
    };
    try {
      const result = await axios.post("http://localhost:8000/api/auth/login", {
        email,
        password,
      });
      if (result.data.success) {

      // console.log(result.data)
        dispatch(userLogin(result.userInfo)); 
        setError("")
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  }
  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input
            name="email"
            required
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button>Login</button>
          {error && <span>{error}</span>}
          <Link to="/signUp">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default LoginPage;
