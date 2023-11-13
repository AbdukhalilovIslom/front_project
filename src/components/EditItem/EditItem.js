import React from "react";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import { TextField } from "@mui/material";
import { base_url } from "../../data";

export default function EditItem({ setOpenEdit, openEdit, setRender, id }) {
  const [name, setName] = useState();
  const [tag, setTag] = useState("#book #fashion #lifehack");

  const handleClose = () => {
    setOpenEdit(false);
    setName();
    setTag();
  };

  const handleUpdate = () => {
    if (name && tag) {
      fetch(`${base_url}/item/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name,
          tag,
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
      open={openEdit}
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
        <div onClick={handleUpdate}>Update</div>
      </div>
    </Dialog>
  );
}
