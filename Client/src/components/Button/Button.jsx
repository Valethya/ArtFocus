import React from "react";

export default function Button({ children, handle, style, type, className }) {
  return (
    <button
      onClick={handle}
      style={style}
      type={type}
      className={`btn ${className}`}
    >
      {children}
    </button>
  );
}
