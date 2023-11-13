import {
  Dialog,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { base_url } from "../../data";

export default function EditCollection({
  openEdit,
  setOpenEdit,
  setRender,
  editigEl,
}) {
  const [theme_id, setTheme_id] = useState();
  const [name, setName] = useState();
  const [image, setImage] = useState();

  const handleClose = () => {
    setOpenEdit(false);
    setTheme_id();
    setName();
    setImage();
  };

  const handleUpdate = () => {
    if (name && theme_id) {
      fetch(`${base_url}/collection/update/${editigEl._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name,
          theme_id,
          image,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          if (!result) return;
          setRender(Math.random());
          handleClose();
        })
        .catch((err) => {
          console.log(err);
          return;
        });
    }
  };

  return (
    <Dialog
      open={openEdit}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div>
        <h2>Update Collection</h2>
        <TextField
          fullWidth
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
        <div onClick={handleUpdate}>Update</div>
      </div>
    </Dialog>
  );
}
