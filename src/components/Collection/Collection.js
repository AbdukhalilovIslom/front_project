import React from "react";
import "./collection.scss";
import { Link } from "react-router-dom";
import defImg from "../../assets/images/Снимок экрана 2023-11-04 в 12.54.20.png";
import { base_url } from "../../data";

export default function Collection({
  el,
  link,
  setEditigEl,
  setOpenEdit,
  setRender,
}) {
  const handleEdit = () => {
    setEditigEl(el);
    setOpenEdit(true);
  };

  const handleDeleteColletion = (id) => {
    if (!id) return;
    fetch(`${base_url}/collection/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setRender(Math.random());
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  };
  return (
    <div className="card" style={{ width: "14rem" }}>
      <img src={defImg} alt="def-img" style={{ width: "100%" }} />
      <Link to={link}>
        <h5>{el.name}</h5>
      </Link>
      <div>
        <span onClick={handleEdit}>Edit</span>
        <span onClick={() => handleDeleteColletion(el._id)}>Delete</span>
      </div>
    </div>
  );
}
