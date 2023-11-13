import React from "react";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import { TextField } from "@mui/material";
import { base_url } from "../../data";

export default function AddItem({ setOpen, open, collection_id, setRender }) {
  const [name, setName] = useState();
  const [tag, setTag] = useState("#book #fashion #lifehack");

  const handleClose = () => {
    setOpen(false);
    setName();
    setTag();
  };

  const handleCreate = () => {
    if (name && tag) {
      fetch(`${base_url}/item/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name,
          tag,
          collection_id,
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
        <h2>Add Item</h2>
        <TextField
          required
          id="outlined-basic"
          label="Name"
          variant="outlined"
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          required
          id="outlined-basic"
          label=""
          variant="outlined"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        <div onClick={handleCreate}>Create</div>
      </div>
    </Dialog>
  );
}
