import {
  Dialog,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { base_url } from "../../data";
import { toast } from "react-toastify";

export default function EditCollection({
  openEdit,
  setOpenEdit,
  collection,
  setRender,
}) {
  const [theme_id, setTheme_id] = useState(collection.theme_id);
  const [name, setName] = useState(collection.name);
  const [image, setImage] = useState(collection.image || undefined);

  const handleClose = () => {
    setOpenEdit(false);
  };

  const handleUpdate = () => {
    if (name && theme_id) {
      fetch(`${base_url}/collection/update/${collection._id}`, {
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
          if (result.status === 200) {
            handleClose();
            setRender(Math.random());
            toast.success("Updated");
          } else {
            toast.error("You are INACTIVE!");
          }
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
      <div className="add__coll">
        <h2 className="add__coll__h2">Update Collection</h2>
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
          <InputLabel id="demo-simple-select-label">Theme</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={theme_id}
            label="Theme"
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
          label="image url"
          variant="outlined"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <div className="spacer"></div>
        <div className="add__coll__btn" onClick={handleUpdate}>
          Update
        </div>
      </div>
    </Dialog>
  );
}
