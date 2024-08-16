import React from "react";

function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`p-2 rounded-md hover:opacity-90 ${className} bg-gray-700`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
