import React, { useContext, useEffect, useState } from "react";

import Icon from "@mui/material/Icon";
function Avatar({ handle, user }) {
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
