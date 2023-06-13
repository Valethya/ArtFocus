import { Icon } from "@mui/material";
import Avatar from "../Avatar/Avatar";

function DataUser(user) {
  console.log(user, " user en profile");
  return (
    <div className="cont">
      <div className="userCard">
        <span className="thumbnailProfile">
          {user.user.thumbnail.length > 0 ? (
            user.user.thumbnail[0]
          ) : (
            <Icon className="iconProfile">person</Icon>
          )}
          <Icon>camera_alt</Icon>
        </span>
        <div>
          <span>
            <p>Nombre: {user.user.fullName}</p>
          </span>
          <span>
            <p>Email: {user.user.email}</p>
          </span>
        </div>
      </div>
    </div>
  );
}
export default DataUser;
