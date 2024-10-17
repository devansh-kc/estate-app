import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./updateProfile.scss";
import UploadWidget from "../../components/UploadWidget/UploadWidget";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../../../ReduxSlice/userSlice";

function UpdateProfilePage() {
  const [error, setError] = useState("");
  const currentUser = useSelector((state) => state.user.userInfo);
  const [avatar, setAvatar] = useState(currentUser.avatar);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const { username, email, password } = Object.fromEntries(formData);

    try {
      const response = await axios.put(
        `http://localhost:8000/api/user/${currentUser.id}`,
        {
          username,
          email,
          password,
          avatar: avatar,
        },
        {
          withCredentials: true,
        }
      );
      const UpdatedUserInfo = response.data.rest;
      dispatch(userLogin(UpdatedUserInfo));
      navigate("/profile");
    } catch (err) {
      console.log(err);
      setError(err.response.data?.message);
    }
  }
  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button>Update</button>
          {error && <span>error</span>}
        </form>
      </div>
      <div className="sideContainer">
        <img
          src={
            avatar ||
            "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
          }
          alt={currentUser.username}
          className="avatar"
        />
        <UploadWidget
          uwConfig={{
            cloudName: "dcjh2tkr8",
            multiple: false,
            uploadPreset: "realEstate",
            // maxImageFileSize: 2000000,
            folder: "avatars",
          }}
          setState={setAvatar}
        />
      </div>
    </div>
  );
}

export default UpdateProfilePage;
