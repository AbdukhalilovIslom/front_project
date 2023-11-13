import React from "react";
import "./aside.scss";
import { Link } from "react-router-dom";

export default function Aside() {
  const isAuthenticated = sessionStorage.getItem("token") ?? false;

  return (
    <div className="aside">
      <div>
        <Link to="/">Home</Link>
      </div>
      {isAuthenticated ? (
        <div>
          <Link to="/profile/collections">Profile</Link>
        </div>
      ) : (
        <div>
          <Link to="/login">Sign in</Link>
          <br />
          <Link to="/registration">Sign up</Link>
        </div>
      )}
    </div>
  );
}
