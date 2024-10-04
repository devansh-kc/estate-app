import React from "react";
import "./profilePage.scss"

function ProfilePage() {
  return (
    <div className="profilePage">
      <div className="userInfo">
        {/* name, username, email, image,  */}
        <p>name:John doe</p>
        <p>username :JohnDoe</p>
        <p>email:john Doe</p>
        <p>user img</p>
        <img
          style={{ width: "100px", height: "100px", borderRadius:"50%" }}
          src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="username"
        />
      </div>
      <div className="messages"></div>
      <div className="userWhistlist"></div>
    </div>
  );
}

export default ProfilePage;
