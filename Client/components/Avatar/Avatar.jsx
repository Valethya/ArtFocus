import React, { useContext, useState } from "react";
import { ApiContext } from "../../context/ApiContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Avatar({ handle }) {
  const { user } = useContext(ApiContext);
  const [icon, setIcon] = useState(<AccountCircleIcon />);

  if (!user?.status == "error") {
    const letter = user.firstName.split("");
    setIcon(letter[0].toUpperCase());
  }
  return (
    <div className="avatar" onClick={handle}>
      {icon}
    </div>
  );
}

export default Avatar;
