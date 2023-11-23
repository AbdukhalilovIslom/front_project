import React, { useState } from "react";
import { ReactComponent as Like } from "../../assets/images/like.svg";
import { ReactComponent as Comment } from "../../assets/images/comment.svg";
import { ReactComponent as Edit } from "../../assets/images/edit.svg";
import { ReactComponent as Delete } from "../../assets/images/Trash.svg";
import { base_url } from "../../data";
import Dialog from "@mui/material/Dialog";
import "./item.scss";
import EditItem from "../EditItem/EditItem";
import { toast } from "react-toastify";

export default function Item({ item, setRender, usersNames }) {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [comment, setComment] = useState();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [like, setLike] = useState(
    user && item.likes.find((el) => el === user._id) ? true : false
  );

  const handleDelete = () => {
    if (item && item._id) {
      fetch(`${base_url}/item/delete/${item._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
        .then((result) => {
          if (result.status === 200) {
            setRender(Math.random());
            toast.success("Item deleted");
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

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && comment && item) {
      if (user) {
        fetch(`${base_url}/item/comment`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            text: comment,
            itemId: item._id,
          }),
        })
          .then((result) => {
            if (result.status === 200) {
              setRender(Math.random());
              setComment("");
            } else {
              toast.error("You are INACTIVE!");
            }
          })
          .catch((err) => {
            console.log(err);
            return;
          });
      } else {
        toast.error("Please sign up!");
      }
    }
  };

  const handleLike = () => {
    if (user) {
      fetch(`${base_url}/item/like`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          itemId: item._id,
        }),
      })
        .then((result) => {
          if (result.status === 200) {
            setLike(true);
            setRender(Math.random());
          } else {
            toast.error("You are INACTIVE!");
          }
        })
        .catch((err) => {
          console.log(err);
          return;
        });
    } else {
      toast.error("Please sign up!");
    }
  };
  const handleUnLike = () => {
    if (user) {
      fetch(`${base_url}/item/unlike`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          itemId: item._id,
        }),
      })
        .then((result) => {
          if (result.status === 200) {
            setLike(false);
            setRender(Math.random());
          } else {
            toast.error("You are INACTIVE!");
          }
        })
        .catch((err) => {
          console.log(err);
          return;
        });
    } else {
      toast.error("Please sign up!");
    }
  };

  const onLike = () => {
    if (like) {
      handleUnLike();
    } else {
      handleLike();
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleView = () => {
    if (item.comments.length) setOpen(true);
  };

  return (
    <div className="item">
      <h3 className="item__h3">{item.name}</h3>
      <div className="item__tag">{item.tag}</div>
      <div className="item__ref">
        <span onClick={onLike} className="item__ref__like">
          <Like className={like ? "like__svg active" : "like__svg"} />
          <span className="item__ref__like__count">{item.likes.length}</span>
        </span>

        <Comment onClick={() => handleView()} className="comment__svg" />
        {user && (user.role === "admin" || user._id === item.userId) ? (
          <Edit
            className="edit__svg"
            onClick={() => {
              setOpenEdit(true);
            }}
          />
        ) : (
          ""
        )}
        {user && (user.role === "admin" || user._id === item.userId) ? (
          <Delete className="delete__svg" onClick={handleDelete} />
        ) : (
          ""
        )}
      </div>
      {item.comments.length ? (
        <p className="item__com">
          <b>Name: </b>
          {usersNames &&
          usersNames.find(
            (user) =>
              user._id === item.comments[item.comments.length - 1].postedBy
          )
            ? usersNames.find(
                (user) =>
                  user._id === item.comments[item.comments.length - 1].postedBy
              ).name
            : "Deleted account"}
          <br />
          {item.comments[item.comments.length - 1].text}
        </p>
      ) : (
        ""
      )}
      {item.comments.length ? (
        <p className="item__com__view" onClick={() => handleView()}>
          All comments ({item.comments.length})
        </p>
      ) : (
        <p className="item__com__view">no comments</p>
      )}

      <input
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="item__input"
        placeholder="Add comment..."
        onKeyDown={handleKeyDown}
      />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div
          data-theme={localStorage.getItem("theme") || "dark"}
          className="item__view"
        >
          <h2 className="item__view__name">{item.name}</h2>
          <p className="item__view__tag">{item.tag}</p>
          <div className="item__view__comms">
            {item.comments.map((el) => (
              <div className="item__view__comm">
                <span>
                  Name:{" "}
                  {usersNames &&
                  usersNames.find((user) => user._id === el.postedBy)
                    ? usersNames.find((user) => user._id === el.postedBy).name
                    : "Deleted account"}
                </span>
                <span>{el.text}</span>
              </div>
            ))}
          </div>
          <div className="item__view__ref">
            <input
              className="item__view__ref__input"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add comment..."
              onKeyDown={handleKeyDown}
            />
            <Like
              onClick={onLike}
              className={like ? "like__svg active" : "like__svg"}
            />
          </div>
        </div>
      </Dialog>
      <EditItem
        setOpenEdit={setOpenEdit}
        openEdit={openEdit}
        setRender={setRender}
        item={item}
      />
    </div>
  );
}
