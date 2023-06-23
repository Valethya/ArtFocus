import { Icon } from "@mui/material";
import ChargeProfile from "./ChargeProfile";
import { useState } from "react";
import Overlay from "../Overlay/Overlay";

function DataUser(user) {
  const [displayOverlay, setDisplayOverlay] = useState(false);
  const handleDisplay = () => {
    setDisplayOverlay(!displayOverlay);
  };
  return (
    <div className="cont">
      <div className="userCard">
        <div className="thumbnailProfile">
          {console.log(user.user.thumbnail[user.user.thumbnail.length - 1])}
          {user.user.thumbnail.length > 0 ? (
            <img
              className="imageProfile"
              src={user.user.thumbnail[user.user.thumbnail.length - 1]}
            ></img>
          ) : (
            <Icon className="iconProfile">person</Icon>
          )}
          <Icon onClick={handleDisplay} className="iconCamera">
            camera_alt
          </Icon>
        </div>
        <div>
          <span>
            <p>Nombre: {user.user.fullName}</p>
          </span>
          <span>
            <p>Email: {user.user.email}</p>
          </span>
        </div>
      </div>
      {displayOverlay && (
        <ChargeProfile
          setDisplayOverlay={setDisplayOverlay}
          displayOverlay={displayOverlay}
          user={user}
        />
      )}
      <Overlay
        style={displayOverlay ? "block" : "none"}
        key="chat"
        onClick={handleDisplay}
      />
    </div>
  );
}
export default DataUser;
