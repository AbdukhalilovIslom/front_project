import React from "react";
import { ReactComponent as Delete } from "../../assets/images/Trash.svg";
import { base_url } from "../../data";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function User({ el, setRender, setLoading }) {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));

  const handleRoleChange = (role) => {
    setLoading(true);
    fetch(`${base_url}/user/update/role/${el._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        role,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (!result) return;
        if (el._id === user._id && role === "user") {
          sessionStorage.clear();
          navigate("/");
          window.location.reload();
        }
        setLoading(false);
        setRender(Math.random());
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  };
  const handleRoleStatus = (status) => {
    setLoading(true);
    fetch(`${base_url}/user/update/status/${el._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        status,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (!result) return;
        setLoading(false);
        setRender(Math.random());
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  };
  const handleDeleteUser = (id) => {
    if (!id) return;
    fetch(`${base_url}/user/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (el._id === user._id) {
          sessionStorage.clear();
          navigate("/");
          window.location.reload();
        }
        setRender(Math.random());
        toast.success("User deleted");
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  };

  return (
    <tr className="users__table__body__tr">
      <td className="users__table__body__td">{el.name}</td>
      <td className="users__table__body__td">{el.email}</td>
      <td className="users__table__body__td">
        {el.role === "admin" ? (
          <span>
            <span className="role active">admin</span>|
            <span onClick={() => handleRoleChange("user")} className="role">
              user
            </span>
          </span>
        ) : (
          <span>
            <span onClick={() => handleRoleChange("admin")} className="role">
              admin
            </span>
            |<span className="role active">user</span>
          </span>
        )}
      </td>
      <td className="users__table__body__td status">
        {el.status === "active" ? (
          <span>
            <span className="role active">active</span>|
            <span onClick={() => handleRoleStatus("inactive")} className="role">
              inactive
            </span>
          </span>
        ) : (
          <span>
            <span onClick={() => handleRoleStatus("active")} className="role">
              active
            </span>
            |<span className="role active">inactive</span>
          </span>
        )}
      </td>
      <td className="users__table__body__td action">
        {el._id ? (
          <Delete
            onClick={() => handleDeleteUser(el._id)}
            className="delete__svg"
          />
        ) : (
          ""
        )}
      </td>
    </tr>
  );
}
