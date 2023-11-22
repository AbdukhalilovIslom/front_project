import React, { useEffect, useState } from "react";
import "./user.scss";
import User from "../../components/User/User";
import { base_url } from "../../data";
import "react-nprogress-latest/dist/style.css";
import { LinearProgress } from "@mui/material";

export default function Users() {
  const [users, setUsers] = useState();
  const [render, setRender] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${base_url}/user/allusers`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        setUsers(result);
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  }, [render]);

  return (
    <div>
      <LinearProgress style={loading ? { opacity: "1" } : { opacity: "0" }} />
      <div className="users__container">
        <div className="users__header">
          <h2 className="users__header__title">Admin</h2>
        </div>
        <table className="users__table">
          <thead className="users__table__head">
            <tr className="users__table__head__tr">
              <td className="users__table__head__td">Name</td>
              <td className="users__table__head__td">Email</td>
              <td className="users__table__head__td">Role</td>
              <td className="users__table__head__td">Status</td>
              <td className="users__table__head__td">Action</td>
            </tr>
          </thead>
          <tbody className="users__table__body">
            {users && users.length
              ? users.map((el) => (
                  <User el={el} setRender={setRender} setLoading={setLoading} />
                ))
              : ""}
          </tbody>
        </table>
      </div>
    </div>
  );
}
