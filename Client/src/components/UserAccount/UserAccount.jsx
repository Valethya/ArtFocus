import { Icon } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiRequest from "../../services/api";
import fetchCurrent from "../../services/userService";
import { useDispatch } from "react-redux";
function UserAccount({ user }) {
  const [icon, setIcon] = useState("");
  const dispatch = useDispatch();

  async function handleLogout() {
    const response = await apiRequest("/auth/logout");
    if (response.status === "success") {
      await fetchCurrent(dispatch);
    }
  }

  useEffect(() => {
    if (user.role == "premium") {
      setIcon(<Icon className="premium">star</Icon>);
    } else {
      setIcon("");
    }
  }, [JSON.stringify(user)]);

  return (
    <>
      <Link className="perfil" to="/perfil">
        <div className="dataUserBox">
          <span className="dataUser">
            {user ? user.name : ""}
            {icon}
          </span>
          <span className="dataUser">{user ? user.email : ""}</span>
        </div>
      </Link>
      <Link onClick={handleLogout} style={user ? {} : { display: "none" }}>
        <Icon className="logout">logout</Icon>
      </Link>
    </>
  );
}
export default UserAccount;
