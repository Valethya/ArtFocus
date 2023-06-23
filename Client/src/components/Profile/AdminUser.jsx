import { useEffect, useState } from "react";
import { fetchUsers } from "../../services/userService";
import { Icon } from "@mui/material";

function AdminUser() {
  const [users, setUsers] = useState([]);
  const url = "/api/users";
  useEffect(() => {
    fetchUsers(url, setUsers);
  }, [JSON.stringify(url)]);
  return (
    <div className="cont">
      <table className="productsTable">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Edad</th>
            <th>Rol</th>
            <th>Ultima conexion</th>
            <th>Documentos</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            const rowClass = index % 2 === 0 ? "evenRow" : "";
            return (
              <tr key={user._id} className={rowClass}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.age}</td>
                <td>{user.role}</td>
                <td>{user.lastConnection}</td>

                <td>{user.document.length}</td>
                <td className="edit">
                  <div>
                    <Icon
                      className="delete"
                      //   onClick={() => handleDelete(user._id)}
                    >
                      delete
                    </Icon>
                    <button className="btnEdit">Editar</button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default AdminUser;
