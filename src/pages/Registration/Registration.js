import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./registration.scss";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { base_url } from "../../data";

export default function Registration() {
  const [name, setName] = useState();
  const [role, setRole] = useState("user");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleRegister = () => {
    if (name && email && password && role) {
      fetch(`${base_url}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          if (!result) return;
          if (result.message === "User already exists") {
            navigate("/login");
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

  useEffect(() => {
    fetch(`${base_url}/user/allusers`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => console.log(result))
      .catch((err) => {
        console.log(err);
        return;
      });
  }, []);

  const handleChange = (event) => {
    setRole(event.target.value);
  };
  return (
    <div className="registration">
      <div className="registration__inner">
        <h2 className="registration__title">Sign Up</h2>
        <TextField
          required
          id="outlined-basic"
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <FormControl fullWidth required>
          <InputLabel id="demo-simple-select-label">Role</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={role}
            label="Role"
            onChange={handleChange}
          >
            <MenuItem value={"user"}>User</MenuItem>
            <MenuItem value={"admin"}>Admin</MenuItem>
          </Select>
        </FormControl>
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
          className="registration__inner__btn"
          onClick={() => {
            handleRegister();
          }}
        >
          Sign Up
        </div>
      </div>
    </div>
  );
}
