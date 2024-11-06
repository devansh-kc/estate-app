import React, { useEffect } from "react";
import "./profilePage.scss";
import List from "../../components/List/List";
import Chat from "../../components/chat/Chat";
import { useSelector } from "react-redux";
import { Navigate, useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userLogOut } from "../../../ReduxSlice/userSlice";
import { Await } from "react-router-dom";
import { Suspense } from "react";
import Card from "../../components/card/Card";

function ProfilePage() {
  const { postResponse, chatPromise } = useLoaderData();

  const userInfo = useSelector((state) => state.user.userInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function logOutHandler(e) {
    e.preventDefault();
    await axios.post(
      "http://localhost:8000/api/auth/logout",
      {},
      { withCredentials: true }
    );
    dispatch(userLogOut());

    navigate("/");
  }
  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <button onClick={() => navigate("/updateProfile")}>
              Update Profile
            </button>
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
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={postResponse.postsMadeByCurrentUser}
              errorElement={<p>Error loading posts</p>}
            >
              {(posts) =>
                posts.map((item) => {
                  return <Card key={item.id} item={item} />;
                })
              }
            </Await>
          </Suspense>
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={postResponse.savedPost}
              errorElement={<p>Error loading posts</p>}
            >
              {(posts) =>
                posts.map((item) => {
                  return <Card key={item.id} item={item.post} />;
                })
              }
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={chatPromise.chat}
              errorElement={<p>Error loading posts</p>}
            >
              {
                (chats) => (
                  // chats.map((chat) => {
                  <Chat chats={chats} />
                )
                // })
              }
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
