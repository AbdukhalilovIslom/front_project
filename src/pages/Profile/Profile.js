import React from "react";
import "./profile.scss";
import Collection from "../../components/Collection/Collection";
import { Outlet, useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="profile">
      <div className="profile__title">
        <h2>Profile</h2>{" "}
        <span className="logout" onClick={handleLogout}>
          Logout
        </span>
      </div>
      <Outlet />
    </div>
  );
}
