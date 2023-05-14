import React from "react";

export default function Button({ children, handle }) {
  return (
    <button onClick={handle} className="btn">
      {children}
    </button>
  );
}
