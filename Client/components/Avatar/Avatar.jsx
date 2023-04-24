import React, { useContext, useEffect, useState } from "react";
import { ApiContext } from "../../context/ApiContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Avatar({ handle }) {
  const { user } = useContext(ApiContext);
  const [icon, setIcon] = useState(<AccountCircleIcon />);

  useEffect(() => {
    if (user) {
      const letter = user.name.split("");
      console.log(letter, "letter?");
      setIcon(letter[0].toUpperCase());
    }
  }, [JSON.stringify(user)]);

  return (
    <div className="avatar" onClick={handle}>
      {icon}
    </div>
  );
}

export default Avatar;
