import React from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import arrow from "../other/arrow.svg"
function Arrows() {
    return (
        <div className="arrow">
            {/* <ExpandMoreIcon sx={{color:"white", fontSize:"3em"}}></ExpandMoreIcon> */}
          <img className="arrowSvg" src={arrow}></img>
        </div>
    )
}

export default Arrows