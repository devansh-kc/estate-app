import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AuthLayout({ children, authentication }) {
  const currentUser = useSelector((state) => state.userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (authentication && currentUser !== authentication) {
      navigate("/login");
    } else if (!authentication && currentUser !== authentication) {
      navigate("/");
    }
  }, [currentUser, navigate, authentication]);

  return <>{children}</>;
}

export default AuthLayout;
