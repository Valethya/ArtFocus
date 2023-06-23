import React, { useEffect, useState } from "react";

import Icon from "@mui/material/Icon";
function Avatar({ handle, user }) {
  console.log(Boolean(user));
  const [icon, setIcon] = useState(<Icon>person</Icon>);
  useEffect(() => {
    if (user) {
      if (user?.thumbnail.length > 0) {
        setIcon(
          <img
            className="imageProfile"
            src={user.thumbnail[user.thumbnail.length - 1]}
          ></img>
        );
      } else if (user.name) {
        const letter = user.name.split("");
        setIcon(letter[0].toUpperCase());
      }
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
