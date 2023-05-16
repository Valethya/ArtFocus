import React, { useContext, useEffect, useState } from "react";
import { ApiContext } from "../../context/ApiContext";

import Icon from "@mui/material/Icon";
function Avatar({ handle }) {
  const { user } = useContext(ApiContext);

  const [icon, setIcon] = useState(<Icon>person</Icon>);

  useEffect(() => {
    if (user) {
      const letter = user.name.split("");
      setIcon(letter[0].toUpperCase());
    } else {
      setIcon(<Icon>person</Icon>);
    }
  }, [JSON.stringify(user)]);

  return (
    <div className="avatar" onClick={handle}>
      {icon}
    </div>
  );
}

export default Avatar;
