import React, { Children } from "react";
import CardContainer from "./CardContainer";
export default function Container(props) {
  return (
    <div className="container">
      <div className="subContainer">{props.children}</div>
    </div>
  );
}
