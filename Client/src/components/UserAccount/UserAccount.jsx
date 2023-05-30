import { Icon } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function UserAccount({ user }) {
  const [icon, setIcon] = useState("");

  useEffect(() => {
    if (user.role == "premium") {
      setIcon(<Icon className="premium">star</Icon>);
    } else {
      setIcon("");
    }
  }, [JSON.stringify(user)]);

  return (
    <Link className="perfil" to="/perfil">
      {" "}
      <div className="dataUserBox">
        <span className="dataUser">
          {user ? user.name : ""}
          {icon}
        </span>
        <span className="dataUser">{user ? user.email : ""}</span>
      </div>
    </Link>
  );
}
export default UserAccount;
