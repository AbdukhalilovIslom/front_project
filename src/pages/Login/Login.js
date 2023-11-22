import React, { useState } from "react";
import "./login.scss";
import { TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { base_url } from "../../data";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleLogin = () => {
    if (email && password) {
      fetch(`${base_url}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          if (!result) return;
          if (result.message === "register") {
            navigate("/registration");
            return;
          }
          if (result.message === "Incorrect password!") {
            toast.error("Incorrect password!");
            return;
          }
          sessionStorage.setItem("token", result.token);
          navigate("/profile/collections");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          return;
        });
    }
  };
  return (
    <div className="login">
      <div className="login__inner">
        <h2 className="login__title">Sign In</h2>
        <TextField
          required
          id="outlined-basic"
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          id="outlined-basic"
          label="Password"
          variant="outlined"
        />
        <div
          className="login__inner__btn"
          onClick={() => {
            handleLogin();
          }}
        >
          Sign In
        </div>
        <Link to="/registration" className="login__inner__btn__reg">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
