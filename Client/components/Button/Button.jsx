import React from "react";

export default function Button({ children, handle, style }) {
  return (
    <button onClick={handle} style={style} className="btn">
      {children}
    </button>
  );
}
