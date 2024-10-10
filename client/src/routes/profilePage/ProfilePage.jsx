import React from "react";
import "./profilePage.scss";
import List from "../../components/List/List";
import Chat from "../../components/chat/Chat";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userLogOut } from "../../../ReduxSlice/userSlice";

function ProfilePage() {
  const userInfo = useSelector((state) => state.user.userInfo);
  const navigate = useNavigate();
  const dispatch=  useDispatch()
  async function logOutHandler(e){
    e.preventDefault();
    await axios.post("http://localhost:8000/api/auth/logout");
    dispatch(userLogOut());
    
    navigate("/")
    

  }
  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <button>Update Profile</button>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img
                src={
                  userInfo.avatar ||
                  "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                }
                alt={userInfo.username}
              />
            </span>
            <span>
              Username: <b>{userInfo.username}</b>
            </span>
            <span>
              E-mail: <b>{userInfo.email}</b>
            </span>
            <button onClick={logOutHandler}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <button>Create New Post</button>
          </div>
          <List />
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <List />
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
