import React, { useEffect, useState } from "react";
import "./profile.scss";
import { Outlet, useNavigate } from "react-router-dom";
import { base_url } from "../../data";
import { LinearProgress } from "@mui/material";

export default function Profile() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    if (!sessionStorage.getItem("user")) {
      fetch(`${base_url}/user/info`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          sessionStorage.setItem("user", JSON.stringify(result));
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          return;
        });
    }
  }, []);

  return (
    <div className="profile">
      <div className="profile__title">
        {user ? <h2>👋🏻 Hello! {user.name}</h2> : ""}
        <span className="logout" onClick={handleLogout}>
          Logout
        </span>
      </div>
      <Outlet />
    </div>
  );
}
