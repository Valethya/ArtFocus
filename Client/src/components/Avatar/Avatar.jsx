import React, { useEffect, useState } from "react";

import Icon from "@mui/material/Icon";
function Avatar({ handle, user }) {
  const [icon, setIcon] = useState(<Icon>person</Icon>);
  useEffect(() => {
    console.log(user);
    if (user?.thumbnai > 0) {
      setIcon(user.thumbnail[0]);
    } else if (user.name) {
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
