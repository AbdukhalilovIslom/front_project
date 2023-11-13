import React from "react";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { base_url } from "../../data";

export default function AddCollection({ setOpen, open, setRender }) {
  const [theme_id, setTheme_id] = useState(1);
  const [name, setName] = useState();
  const [image, setImage] = useState();

  const handleClose = () => {
    setOpen(false);
    setTheme_id();
    setName();
    setImage();
  };

  const handleCreate = () => {
    if (theme_id && name) {
      fetch(`${base_url}/collection/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          theme_id,
          name,
          image,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          if (!result) return;
          handleClose();
          setRender(Math.random());
        })
        .catch((err) => {
          console.log(err);
          return;
        });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div>
        <h2>Add Collection</h2>
        <TextField
          fullWidth
          required
          id="outlined-basic"
          label="Name"
          variant="outlined"
          onChange={(e) => setName(e.target.value)}
        />
        <FormControl fullWidth required>
          <InputLabel id="demo-simple-select-label">Role</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={theme_id}
            label="Role"
            onChange={(e) => setTheme_id(e.target.value)}
          >
            <MenuItem value={1}>Theme 1</MenuItem>
            <MenuItem value={2}>Theme 2</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          required
          id="outlined-basic"
          label=""
          variant="outlined"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <div onClick={handleCreate}>Create</div>
      </div>
    </Dialog>
  );
}
